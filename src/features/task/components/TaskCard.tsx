import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { useAppDispatch } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import type { ITask } from "../interface/task";
import type { TTaskPriority, TTaskStatus } from "../validation/task";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { TaskCardActions } from "./TaskCardActions";
import { TaskForm } from "./TaskForm";
import { TaskPrioritySelect, TaskStatusSelect } from "./TaskSelect";

interface TaskCardProps {
  task: ITask;
}

export function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleStatusChange = (status: TTaskStatus) => {
    // dispatch(updateTaskStatus({ id: task.id, status }));
    toast.add({
      type: "success",
      description: "Task status updated successfully!",
    });
  };

  const handlePriorityChange = (priority: TTaskPriority) => {
    // dispatch(updateTaskPriority({ id: task.id, priority }));
    toast.add({
      type: "success",
      description: "Task priority updated successfully!",
    });
  };

  const handleDeleteTask = () => {
    // dispatch(deleteTask(task.id));
    setDeleteOpen(false);
    toast.add({
      type: "success",
      description: "Task deleted successfully!",
    });
  };

  return (
    <>
      <Card size="sm" className="w-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-sm leading-snug">{task.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {task.description}
          </CardDescription>
          <CardAction>
            <TaskCardActions
              onEdit={() => setFormOpen(true)}
              onDelete={() => setDeleteOpen(true)}
            />
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <TaskStatusSelect
              value={task.status}
              onValueChange={handleStatusChange}
            />
            <Separator orientation="vertical" className="h-3" />
            <TaskPrioritySelect
              value={task.priority}
              onValueChange={handlePriorityChange}
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-1">
          <Separator className="mb-2" />
          <div className="flex w-full flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>
              Created{" "}
              {formatDistanceToNow(new Date(task.createdAt), {
                addSuffix: true,
              })}
            </span>
            <span>
              Updated{" "}
              {formatDistanceToNow(new Date(task.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </CardFooter>
      </Card>

      <TaskForm open={formOpen} onOpenChange={setFormOpen} editTask={task} />

      <DeleteTaskDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteTask}
      />
    </>
  );
}
