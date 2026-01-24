import { Task } from '@/hooks/useTasks';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <Circle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.todo}</p>
              <p className="text-sm text-muted-foreground">To Do</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completionRate}%</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
