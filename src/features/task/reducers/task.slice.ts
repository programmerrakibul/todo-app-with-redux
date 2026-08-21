import { createSlice } from "@reduxjs/toolkit";
import type { ITaskInitialState } from "../interface/task";

const initialState: ITaskInitialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
