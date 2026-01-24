import { useState, useMemo } from 'react';
import { Task, TaskStatus, useTasks } from '@/hooks/useTasks';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskDialog } from '@/components/dashboard/TaskDialog';
import { TaskFilters } from '@/components/dashboard/TaskFilters';
import { TaskStats } from '@/components/dashboard/TaskStats';
import { Button } from '@/components/ui/button';
import { Plus, Inbox, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data: allTasks = [], isLoading } = useTasks();
  
  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesSearch = !search || 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allTasks, statusFilter, search]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your tasks and stay productive</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats tasks={allTasks} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {search || statusFilter !== 'all'
                ? 'Try adjusting your filters to see more tasks.'
                : "You're all caught up! Create a new task to get started."}
            </p>
            {!search && statusFilter === 'all' && (
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create your first task
              </Button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>
        )}

        {/* Task Dialog */}
        <TaskDialog
          open={dialogOpen}
          onOpenChange={handleCloseDialog}
          task={editingTask}
        />
      </main>
    </div>
  );
}
