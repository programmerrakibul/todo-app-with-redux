import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskCard } from "./TaskCard";
import { TaskEmpty } from "./TaskEmpty";
import type { ITask } from "../interface/task";
import type { TaskFilters } from "./TaskFilterBar";

interface TaskListProps {
  tasks: ITask[];
  filters: TaskFilters;
  isLoading?: boolean;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

function TaskCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-none p-5 ring-1 ring-foreground/5 shadow-sm bg-card">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="size-7 shrink-0" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-px w-full mt-1" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
}

export function TaskList({
  tasks,
  filters,
  isLoading = false,
  onEdit,
  onDelete,
}: TaskListProps) {
  const filtered = useMemo(() => {
    let result = [...tasks];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    // Status
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }

    // Priority
    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }

    // Sort by createdAt
    result.sort((a, b) => {
      const diff =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return filters.sort === "newest" ? -diff : diff;
    });

    return result;
  }, [tasks, filters]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <TaskEmpty
        message={
          tasks.length === 0
            ? "Add your first task using the button above."
            : "No tasks match the current filters."
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
