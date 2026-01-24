import { Task, TaskStatus, useUpdateTask, useDeleteTask } from '@/hooks/useTasks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit, Calendar, CheckCircle, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const statusConfig: Record<TaskStatus, { label: string; icon: typeof Circle; variant: 'default' | 'secondary' | 'outline' }> = {
  todo: { label: 'To Do', icon: Circle, variant: 'outline' },
  in_progress: { label: 'In Progress', icon: Clock, variant: 'secondary' },
  completed: { label: 'Completed', icon: CheckCircle, variant: 'default' },
};

const priorityColors: Record<number, string> = {
  1: 'bg-muted',
  2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  3: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  4: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  5: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTask.mutate({ id: task.id, status: newStatus });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate(task.id);
    }
  };

  return (
    <Card className="card-hover group animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button
              onClick={() => handleStatusChange(task.status === 'completed' ? 'todo' : 'completed')}
              className="mt-0.5 flex-shrink-0 transition-colors hover:text-primary"
            >
              <StatusIcon className={`h-5 w-5 ${task.status === 'completed' ? 'text-success' : 'text-muted-foreground'}`} />
            </button>
            <div className="min-w-0 flex-1">
              <h3 className={`font-medium truncate ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
                <Circle className="mr-2 h-4 w-4" />
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in_progress')}>
                <Clock className="mr-2 h-4 w-4" />
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={status.variant} className="text-xs">
            {status.label}
          </Badge>
          {task.priority > 1 && (
            <Badge className={`text-xs ${priorityColors[task.priority]}`}>
              P{task.priority}
            </Badge>
          )}
          {task.due_date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.due_date), 'MMM d')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
