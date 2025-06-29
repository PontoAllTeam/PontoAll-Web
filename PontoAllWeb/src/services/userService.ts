import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { User } from "../types/models/user";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export default class UserService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://localhost:7201/api/v1",
      withCredentials: true,
    });

    const token = Cookies.get("auth_token");
    if (token) {
      this.setToken(token);
    }
  }

  private setToken(token: string) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private removeToken() {
    delete this.api.defaults.headers.common["Authorization"];
  }

  async login(credentials: LoginRequest, rememberMe = false): Promise<void> {
    try {
      const response = await this.api.post<LoginResponse>("/User/Login", credentials);
      const token = response.data.token;

      Cookies.set("auth_token", token, {
        expires: rememberMe ? 7 : undefined,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      });

      this.setToken(token);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw error;
    }
  }

  logout(): void {
    Cookies.remove("auth_token");
    this.removeToken();
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.api.get<User>("/User/Current");
    return response.data;
  }
}
