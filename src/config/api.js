import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fep.misk-donate.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;