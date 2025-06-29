import axios, { AxiosInstance } from 'axios';

interface ApiClientConfig {
  baseUrl: string;
}

class ApiClient {
  private api: AxiosInstance;

  constructor(initialConfig: ApiClientConfig) {
    this.api = axios.create({
      baseURL: initialConfig.baseUrl,
    });
  }

  public getApi() {
    return this.api;
  }

  public getBaseUrl() {
    return this.api.defaults.baseURL;
  }

  public setBaseUrl(newBaseUrl: string) {
    console.log('passei aqui 1')
    if (!newBaseUrl) return;
    this.api.defaults.baseURL = newBaseUrl;
  }

  public setToken(token: string) {
    console.log('passei aqui 2')
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
