import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from 'utils/authToken';

export class HttpService {
  instance: AxiosInstance;

  constructor() {
    const instance = axios.create();

    instance.interceptors.request.use(this.handleRequest);
    this.instance = instance;
  }

  handleRequest = (config: InternalAxiosRequestConfig) => {
    const authToken = getAuthToken();
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
  };

  get = (url: string, config = {}) => this.instance.get(url, config);

  post = (url: string, data: object, config = {}) => this.instance.post(url, data, config);

  put = (url: string, data: object, config = {}) => this.instance.put(url, data, config);

  delete = (url: string, config = {}) => this.instance.delete(url, config);

  patch = (url: string, data: object, config = {}) => this.instance.patch(url, data, config);
}
