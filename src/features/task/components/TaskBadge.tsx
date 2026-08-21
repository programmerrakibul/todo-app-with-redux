import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  PRIORITY_BADGE_CONFIG,
  STATUS_BADGE_CONFIG,
} from "../constants/task";
import type { TTaskPriority, TTaskStatus } from "../validation/task";

interface TaskStatusBadgeProps {
  status: TTaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = STATUS_BADGE_CONFIG[status];
  return (
    <Badge className={cn(config.className)}>{config.label}</Badge>
  );
}

interface TaskPriorityBadgeProps {
  priority: TTaskPriority;
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  const config = PRIORITY_BADGE_CONFIG[priority];
  return (
    <Badge className={cn(config.className)}>{config.label}</Badge>
  );
}
