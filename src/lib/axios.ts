import * as axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: `${import.meta.env.VITE_CLIENT_BASE_URL}/api`,
});

export default axios;
