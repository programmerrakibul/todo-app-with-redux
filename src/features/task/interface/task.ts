import type { TCreateTask } from "../validation/task";

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
