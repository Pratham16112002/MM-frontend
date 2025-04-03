import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MAVEN_BACKEND_URL,
  timeout: 10000,
});

export interface Response {
  message: string;
  data: any;
  code: number;
  success: boolean;
}

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
