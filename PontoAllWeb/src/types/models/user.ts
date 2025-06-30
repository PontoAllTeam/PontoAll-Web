import { UserStatus, UserType } from "../enums";

export interface User {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  recoveryemail: string;
  registration: string;
  password: string;
  type: UserType;
  status: UserStatus;
  companyid: number;
  sectorid: number;
}
