import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import { ErrorType } from 'constants/enum';
import { Error } from 'constants/type';
import { showSuccessAlert } from 'helpers/alert';

import store from 'store';
import {setError} from 'store/slices/appSlice';

const showErrorAlert = (message: string, title: string = 'Error') => {
  showSuccessAlert({
    title,
    message: message,
    onConfirm: () => {},
  });
};

export const handleApiError = (url: string, err: AxiosError) => {
  
  if (err.response) {
    console.log('API ERROR RESPONSE: ', err.toJSON());
    handleErrorResponse(err.response, err.message, err.config);
  } else if (err.request) {
    handleErrorRequest(err.request, err.message, err.code);
  }
  throw err
};

export const handleErrorResponse = (
  response: AxiosResponse,
  message: string,
  requestConfig: AxiosRequestConfig
) => {
  const {status, config, data} = response;

  switch (status) {
    case 400:
      if (!config.url) {
        showErrorAlert(message);
      }
      break;      
    default:
      showErrorAlert(message);
      break;
  }
};

export const handleErrorRequest = (
  request: XMLHttpRequest,
  message: string,
  code?: string,
) => {
  if (code === 'ECONNABORTED') {
    const error: Error = {
      type: ErrorType.TIMEOUT,
      errorMessage: 'REQUEST TIMEOUT',
    };
    store.dispatch(setError(error));
  }
};
