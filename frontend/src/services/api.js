import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://disaster-backend-9xpr.onrender.com/api"
});

API.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

export const getStats = () => API.get("/auth/stats");
export const getLogs = () => API.get("/auth/logs");
export const getUsers = () => API.get("/auth/users");

export const sendReport = (data) => API.post("/report", data);
export const getReports = () => API.get("/report");

export const getAdvice = (data) => API.post("/ai/predict", data);
export const chatBot = (data) => API.post("/ai/chat", data);
export const getWeather = (data) => API.post("/ai/predict", data);

export const getAlerts = () => API.get("/ai/news");

export default API;