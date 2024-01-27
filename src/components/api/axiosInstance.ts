import axios from 'axios';

const baseURL = 'https://localhost:7249/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

export default axiosInstance;
