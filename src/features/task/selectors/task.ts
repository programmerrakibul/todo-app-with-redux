import type { RootState } from "@/redux/store";

export const selectAllTask = (state: RootState) => state.tasks;
export const selectAllFilters = (state: RootState) => state.taskFilters;
export const selectSearchFilter = (state: RootState) =>
  state.taskFilters.search;
export const selectStatusFilter = (state: RootState) =>
  state.taskFilters.status;
export const selectPriorityFilter = (state: RootState) =>
  state.taskFilters.priority;
export const selectSortOrder = (state: RootState) => state.taskFilters.sort;
