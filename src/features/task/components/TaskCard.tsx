import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import type { ITask } from "../interface/task";
import { TaskPriorityBadge, TaskStatusBadge } from "./TaskBadge";
import { TaskForm } from "./TaskForm";

interface TaskCardProps {
  task: ITask;
}

export function TaskCard({ task }: TaskCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Card size="sm" className="w-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-sm leading-snug">{task.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {task.description}
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Task actions"
                  />
                }
              >
                <MoreVerticalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setOpen(true)}>
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2Icon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <TaskStatusBadge status={task.status} />
            <Separator orientation="vertical" className="h-3" />
            <TaskPriorityBadge priority={task.priority} />
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

      <TaskForm
        open={open}
        onOpenChange={(open) => {
          if (!open) setOpen(false);
        }}
        editTask={task}
      />
    </>
  );
}
