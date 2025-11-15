import { User } from '../models/user';

export interface LoginResponse {
  token: string;
  user: User;
}
