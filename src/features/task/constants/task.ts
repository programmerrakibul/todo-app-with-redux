import type { TTaskPriority, TTaskStatus } from "../validation/task";

export interface IBadgeConfig {
  label: string;
  className: string;
}

export const STATUS_BADGE_CONFIG: Record<TTaskStatus, IBadgeConfig> = {
  TODO: {
    label: "To Do",
    className: "text-muted-foreground",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "text-primary",
  },
  DONE: {
    label: "Done",
    className: "text-green-600 dark:text-green-400",
  },
};

export const PRIORITY_BADGE_CONFIG: Record<TTaskPriority, IBadgeConfig> = {
  LOW: {
    label: "Low",
    className: "text-muted-foreground",
  },
  MEDIUM: {
    label: "Medium",
    className: "text-yellow-600 dark:text-yellow-400",
  },
  HIGH: {
    label: "High",
    className: "text-destructive",
  },
};
