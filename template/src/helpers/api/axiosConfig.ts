
import qs from 'qs';
import { PathLike } from 'fs';

import {
  AxiosRequestConfig,
} from 'axios';

export interface APIResponse<T = any> {
  data: T,
  status: any;
}

const apiDefaultRequestConfig: AxiosRequestConfig = {
  timeout: 30000, // milliseconds
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: (r: APIResponse) => r,
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
};

export default apiDefaultRequestConfig;