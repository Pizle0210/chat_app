import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4009/api",
  withCredentials: true
});
