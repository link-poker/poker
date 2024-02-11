import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAuthInfo, removeAuthInfo } from 'utils/authInfo';

export class HttpService {
  instance: AxiosInstance;

  constructor() {
    const instance = axios.create();

    instance.interceptors.request.use(this.handleRequest);
    instance.interceptors.response.use(this.handleResponse, this.handleError);
    this.instance = instance;
  }

  get = (url: string, config = {}) => this.instance.get(url, config);

  post = (url: string, data: object, config = {}) => this.instance.post(url, data, config);

  put = (url: string, data: object, config = {}) => this.instance.put(url, data, config);

  delete = (url: string, config = {}) => this.instance.delete(url, config);

  patch = (url: string, data: object, config = {}) => this.instance.patch(url, data, config);

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    const authInfo = getAuthInfo();
    if (authInfo?.authToken) {
      config.headers.authorization = `Bearer ${authInfo.authToken}`;
    }
    return config;
  };

  private handleResponse = (response: any) => {
    return response;
  };

  private handleError = (error: any) => {
    if (error.response?.data.error === 'Invalid authToken') {
      console.log('Invalid authToken');
      removeAuthInfo();
    }
    return Promise.reject(error);
  };
}
