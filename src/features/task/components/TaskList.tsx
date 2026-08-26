import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useGetTasksQuery } from "../reducers/task.slice";
import taskServices from "../services/task";
import { TaskCard } from "./TaskCard";
import { TaskEmpty } from "./TaskEmpty";

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

export function TaskList() {
  const { isLoading, data: tasks } = useGetTasksQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(taskServices.getTasksThunk());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tasks) {
    return <TaskEmpty message={"No tasks match the current filters."} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
