import TokenManager from '@/utils/tokenManager';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const axiosPrivate = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MAVEN_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosPrivate.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await TokenManager.getInstance().getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = async (error: any, token: string | null = null) => {
  for (const prom of failedQueue) {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  }
  failedQueue = [];
};

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(async (token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosPrivate(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const newToken =
          await TokenManager.getInstance().generateNewAccessToken();
        await processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosPrivate(originalRequest);
      } catch (error: any) {
        await processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
