import { UserStatus } from '../enums/userStatus';
import { UserType } from '../enums/userType';

export interface User {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  recoveryEmail: string;
  registration: string;
  password: string;
  userType: UserType;
  userStatus: UserStatus;
  companyId: number;
  sectorId: number;
  photos?: string[];
}
