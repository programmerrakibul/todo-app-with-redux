import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITask, ITaskInitialState } from "../interface/task";

const initialState: ITaskInitialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

const taskApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_CLIENT_BASE_URL}/api`,
  }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
export default taskApi;
