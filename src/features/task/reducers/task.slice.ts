import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITask, ITaskFilter } from "../interface/task";
import type {
  TCreateTask,
  TUpdateTask,
  TUpdateTaskPriority,
  TUpdateTaskStatus,
} from "../validation/task";

const taskApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_CLIENT_BASE_URL}/api/tasks`,
  }),
  tagTypes: ["Task"],
  endpoints: (build) => ({
    getTasks: build.query<ITask[], ITaskFilter>({
      query: (params) => ({
        url: "/",
        method: "GET",
        params,
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

    updateTask: build.mutation<
      { task: ITask },
      { id: ITask["id"]; data: Partial<TUpdateTask> }
    >({
      query: (payload) => ({
        url: `/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),

      invalidatesTags: ["Task"],
    }),

    updateTaskStatus: build.mutation<
      { task: ITask },
      {
        id: ITask["id"];
        data: TUpdateTaskStatus;
      }
    >({
      query: (payload) => ({
        url: `/${payload.id}/status`,
        body: payload.data,
        method: "PATCH",
      }),

      invalidatesTags: ["Task"],
    }),

    updateTaskPriority: build.mutation<
      { task: ITask },
      {
        id: ITask["id"];
        data: TUpdateTaskPriority;
      }
    >({
      query: (payload) => ({
        url: `/${payload.id}/priority`,
        body: payload.data,
        method: "PATCH",
      }),

      invalidatesTags: ["Task"],
    }),

    deleteTask: build.mutation<unknown, ITask["id"]>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useUpdateTaskPriorityMutation,
  useDeleteTaskMutation,
} = taskApi;
export default taskApi;
