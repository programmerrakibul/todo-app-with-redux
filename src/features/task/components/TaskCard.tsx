import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ITask } from "../interface/task";
import { TaskStatusBadge, TaskPriorityBadge } from "./TaskBadge";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
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
                <DropdownMenuItem onSelect={() => onEdit(task)}>
                  <PencilIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => onDelete(task.id)}
                >
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
  );
}
