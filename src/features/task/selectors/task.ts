import type { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectAllFilters } from "./task-filter";

export const selectAllTask = (state: RootState) => state.tasks;
export const selectFilteredTasks = createSelector(
  [selectAllTask, selectAllFilters],
  (data, filters) => {
    const filtered = data.data
      .filter((task) => {
        if (filters.status !== "ALL" && task.status !== filters.status)
          return false;

        if (filters.priority !== "ALL" && task.priority !== filters.priority)
          return false;

        if (
          filters.search !== "" &&
          !task.title.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;

        return true;
      })
      .sort((taskA, taskB) => {
        const dateTaskA = Number(taskA.createdAt);
        const dateTaskB = Number(taskB.createdAt);

        if (filters.sort === "newest") {
          return dateTaskB - dateTaskA;
        } else {
          return dateTaskA - dateTaskB;
        }
      });

    return {
      data: filtered,
      isLoading: data.isLoading,
      isError: data.isError,
      error: data.error,
    };
  },
);
