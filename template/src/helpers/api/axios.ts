import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

import apiDefaultRequestConfig from './axiosConfig';
const initialization = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create(config);
  return instance;
};

const axiosInstance = initialization(apiDefaultRequestConfig);

export default axiosInstance;
