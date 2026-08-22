import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, ITaskInitialState } from "../interface/task";
import type { TCreateTask, TUpdateTask } from "../validation/task";

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

    updateTask: (
      state,
      action: PayloadAction<{ id: ITask["id"]; data: TUpdateTask }>,
    ) => {
      const { id, data } = action.payload;
      const task = state.data.find((task) => task.id === id);

      if (!task) return;

      Object.assign(task, data);
    },

    // updateTaskStatus: (
    //   state,
    //   action: PayloadAction<{ id: ITask["id"]; status: ITask["status"] }>,
    // ) => {
    //   const { id, status } = action.payload;
    //   const task = state.data.find((task) => task.id === id);

    //   if (!task) return;

    //   task.status = status;
    // },

    // updateTaskPriority: (
    //   state,
    //   action: PayloadAction<{ id: ITask["id"]; priority: ITask["priority"] }>,
    // ) => {
    //   const { id, priority } = action.payload;
    //   const task = state.data.find((task) => task.id === id);

    //   if (!task) return;

    //   task.priority = priority;
    // },

    // deleteTask: (state, action: PayloadAction<ITask["id"]>) => {
    //   const id = action.payload;
    //   state.data = state.data.filter((task) => task.id !== id);
    // },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
