import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, ITaskInitialState } from "../interface/task";
import type { TCreateTask } from "../validation/task";

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
    addTask: {
      prepare: (input: TCreateTask) => {
        const task: ITask = {
          id: nanoid(),
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        return { payload: task };
      },
      reducer: (state, action: PayloadAction<ITask>) => {
        console.log(action.payload);
        state.data.push(action.payload);
      },
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
