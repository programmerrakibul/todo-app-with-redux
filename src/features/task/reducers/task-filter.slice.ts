import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITaskFilter } from "../interface/task";

type TaskFilterKey = keyof ITaskFilter;

type UpdateFilterPayload = {
  [K in TaskFilterKey]: { type: K; value: ITaskFilter[K] };
}[TaskFilterKey];

const initialState: ITaskFilter = {
  priority: "ALL",
  status: "ALL",
  search: "",
  sort: "newest",
};

const taskFilterSlice = createSlice({
  name: "taskFilter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<UpdateFilterPayload>) => {
      switch (action.payload.type) {
        case "priority":
          state.priority = action.payload.value;
          break;
        case "status":
          state.status = action.payload.value;
          break;
        case "search":
          state.search = action.payload.value.trim();
          break;
        case "sort":
          state.sort = action.payload.value;
          break;
      }
    },

    clearFilter: (state) => {
      state = initialState;
    },
  },
});

export const { updateFilter, clearFilter } = taskFilterSlice.actions;

export default taskFilterSlice.reducer;
