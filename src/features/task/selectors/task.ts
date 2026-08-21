import type { RootState } from "@/redux/store";

export const selectAllTask = (state: RootState) => state.tasks;
