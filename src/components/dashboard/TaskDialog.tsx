import { useEffect, useState } from 'react';
import { Task, TaskStatus, CreateTaskInput, useCreateTask, useUpdateTask } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  status: z.enum(['todo', 'in_progress', 'completed']),
  priority: z.number().min(1).max(5),
  due_date: z.string().optional(),
});

export function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isLoading = createTask.isPending || updateTask.isPending;
  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.due_date || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority(1);
      setDueDate('');
    }
    setError('');
  }, [task, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = taskSchema.safeParse({
      title,
      description: description || undefined,
      status,
      priority,
      due_date: dueDate || undefined,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const taskData: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      due_date: dueDate || undefined,
    };

    if (isEditing) {
      updateTask.mutate(
        { id: task.id, ...taskData },
        {
          onSuccess: () => onOpenChange(false),
        }
      );
    } else {
      createTask.mutate(taskData, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the task details below.' : 'Add a new task to your list.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="input-focus"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              className="input-focus resize-none"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                <SelectTrigger className="input-focus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority.toString()} onValueChange={(value) => setPriority(parseInt(value))}>
                <SelectTrigger className="input-focus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low (P1)</SelectItem>
                  <SelectItem value="2">Normal (P2)</SelectItem>
                  <SelectItem value="3">Medium (P3)</SelectItem>
                  <SelectItem value="4">High (P4)</SelectItem>
                  <SelectItem value="5">Urgent (P5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-focus"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Saving...' : 'Creating...'}
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Create Task'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
