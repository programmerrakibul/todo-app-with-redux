import type { TCreateTask, TTaskPriority, TTaskStatus } from "../validation/task";

export interface ITask extends TCreateTask {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskInitialState {
  data: ITask[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export interface ITaskFilter {
  status: TTaskStatus | "ALL";
  priority: TTaskPriority | "ALL";
  search: string;
  sort: "newest" | "oldest";
}
