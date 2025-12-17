// api/axios.ts
import axios, { AxiosError } from 'axios';
import store from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let isLoggingOut = false;

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      console.log('401 – session expired, logging out');

      // localStorage.removeItem('token');
      localStorage.removeItem('userInfo');

      store.dispatch(logout());

      window.location.replace('/login');

      // 🔑 IMPORTANT: stop propagation
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default api;
