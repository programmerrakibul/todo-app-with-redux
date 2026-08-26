import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITask } from "../interface/task";
import type { TCreateTask } from "../validation/task";

const taskApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_CLIENT_BASE_URL}/api/tasks`,
  }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    addTask: build.mutation<{ task: ITask }, TCreateTask>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
export default taskApi;
