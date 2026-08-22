import taskFilterReducer from "@/features/task/reducers/task-filter.slice";
import tasksReducer from "@/features/task/reducers/task.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    taskFilters: taskFilterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
