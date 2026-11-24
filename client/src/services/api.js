import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

api.interceptors.request.use(config => {
  const token = localStorage.getItem("aks_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If an admin session expires, clear it and send them back to login.
api.interceptors.response.use(r => r, error => {
  const isLogin = error.config?.url?.includes("/auth/login");
  if (error.response?.status === 401 && !isLogin && localStorage.getItem("aks_admin_token")) {
    localStorage.removeItem("aks_admin_token");
    window.location.href = "/admin/login";
  }
  return Promise.reject(error);
});

export default api;
