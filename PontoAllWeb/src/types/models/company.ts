import { CompanyStatus } from '../enums/companyStatus';

export interface Company {
  id: number;
  corporateName: string;
  fantasyName: string;
  cnpj: string;
  email: string;
  businessPhone: string;
  state: string;
  city: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: number;
  companyStatus: CompanyStatus;
}
