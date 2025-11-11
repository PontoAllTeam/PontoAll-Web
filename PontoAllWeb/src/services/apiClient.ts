import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

interface ApiClientConfig {
  baseUrl: string;
}

class ApiClient {
  private api: AxiosInstance;

  constructor(initialConfig: ApiClientConfig) {
    this.api = axios.create({
      baseURL: initialConfig.baseUrl,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public getApi() {
    return this.api;
  }

  public getBaseUrl() {
    return this.api.defaults.baseURL;
  }

  public setBaseUrl(newBaseUrl: string) {
    if (!newBaseUrl) return;
    this.api.defaults.baseURL = newBaseUrl;
  }

  public setToken(token: string) {
    if (!token) return;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeToken() {
    this.api.defaults.headers.common['Authorization'] = '';
  }
}

export default new ApiClient({
  baseUrl: 'https://localhost:7201/api/v1',
});
