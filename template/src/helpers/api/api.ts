import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import axiosInstance from './axios';
import { handleApiError } from './handleError';
import store from '@store/index';
import app from 'store/slices/appSlice';
import { Header, Options } from './types';

type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {  
  return config;
}, (error: any): any => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response: AxiosResponse): AxiosResponse => {  
  return response;
}, (error: AxiosError): any => {
  return Promise.reject(error);
});

/**
 * Define Interface for response Type of Data
 */
export interface IApiResponse<T = any> {
  data: T,
  status: any;
}

export const getDataFormBy = (data: any) => {
  var form_data = new FormData();
  Object.keys(data).forEach(key => form_data.append(key, data[key]))
  return form_data
}

/**
 * Requests to API
 * @param {String} type
 * @param {String} endpoint
 * @param {Object} data
 * @param {Object} headers
 * @param {import('axios').AxiosRequestConfig} options
 */
const request = async <T>(type: RequestMethodType, endpoint: string, data: any = undefined, headers?: Header, option?: Options): Promise<T> => {
  let requestAPI: Promise<AxiosResponse<T>>;
  if (option && option.needAuthorizedToken) {
    const token: string | null = ''
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`,
        ...headers,
      }
    }
  }
  const requestConfig: AxiosRequestConfig = {
    data,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method: type,
  };

  switch (type) {
    case 'POST':
      if (data && headers && (headers['Content-Type'] === 'application/x-www-form-urlencoded' || headers['Content-Type'] === 'multipart/form-data')) {
        var form_data_post = getDataFormBy(data);
        requestAPI = axiosInstance.post<T>(endpoint, form_data_post, requestConfig);
      } else { 
        requestAPI = axiosInstance.post<T>(endpoint, data, requestConfig);
      }
      break;
    case 'PUT':
      if (data && headers && (headers['Content-Type'] === 'application/x-www-form-urlencoded' || headers['Content-Type'] === 'multipart/form-data')) {
        var form_data_put = getDataFormBy(data);
        requestAPI = axiosInstance.put<T>(endpoint, form_data_put, requestConfig);
      } else { 
        requestAPI = axiosInstance.put<T>(endpoint, data, requestConfig);
      }
      break;
    case 'DELETE':
      requestAPI = axiosInstance.delete<T>(endpoint, requestConfig);
      break;
    default:
      requestAPI = axiosInstance.get<T>(endpoint, requestConfig);
      break;
  }
  if (!option || !option.ignoreLoading) {
    store.dispatch(app.actions.addProcessLoading(`${endpoint}`));
  }
  return requestAPI.then((response: AxiosResponse<T>) => {
    if (!option || !option.ignoreLoading) {
      store.dispatch(app.actions.removeProcessLoading(`${endpoint}`));
    }
    return response.data;
  }).catch((error: AxiosError) => {
    // Stop loading processing
    if (option && option.ignoreError) {
      throw error;
    }

    if (!option || !option.ignoreLoading) { 
      store.dispatch(app.actions.removeProcessLoading(`${endpoint}`));
    }


    return handleApiError(endpoint, error);
  });
};

const get = <T>(url: string, queryParam = undefined, headers = {}, options: Options = {
  needAuthorizedToken: false,
  ignoreLoading: false,
}) => (
  request<T>('GET', url, queryParam, headers, options)
);

const post = <T>(url: string, data = {}, headers = {}, options: Options = {
  needAuthorizedToken: false,
  ignoreLoading: false,
}) => (
  request<T>('POST', url, data, headers, options)
);

const put = <T>(url: string, data = {}, headers = {}, options: Options = {
  needAuthorizedToken: false,
  ignoreLoading: false,
}) => (
  request<T>('PUT', url, data, headers, options)
);

const remove = <T>(url: string, queryParam = {}, headers = {}, options: Options = {
  needAuthorizedToken: false,
  ignoreLoading: false,
}) => (
  request<T>('DELETE', url, queryParam, headers, options)
);

export default {
  get,
  post,
  put,
  delete: remove,
};