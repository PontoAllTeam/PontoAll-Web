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
  departmentid: number;
  sectorid: number;

  typeName: string;       // Ex: "Diretor"
  statusName: string;     // Ex: "Ativo"
  sectorName: string;     // Ex: "Pessoal"
  departmentName: string; // Ex: "RH"
}
