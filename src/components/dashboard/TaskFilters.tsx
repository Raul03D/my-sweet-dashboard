import { TaskStatus } from '@/hooks/useTasks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: TaskStatus | 'all';
  onStatusChange: (value: TaskStatus | 'all') => void;
}

export function TaskFilters({ search, onSearchChange, status, onStatusChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 input-focus"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearchChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Select value={status} onValueChange={(value) => onStatusChange(value as TaskStatus | 'all')}>
        <SelectTrigger className="w-full sm:w-[180px] input-focus">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tasks</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
