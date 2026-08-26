import axios from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITask } from "../interface/task";

const getTasksThunk = createAsyncThunk("tasks/getTasks", async () => {
  const { data } = await axios.get<ITask[]>("/tasks");
  return data;
});

const taskServices = {
  getTasksThunk,
};

export default taskServices;
