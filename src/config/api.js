import axios from "axios";

const api = axios.create({
  baseURL: "https://fep.misk-donate.com/api",
  headers: {
    "Content-Type": "application/json",
  },

  //withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("rJp7E3Qi7r172VD");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
