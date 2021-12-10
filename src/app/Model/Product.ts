import { User } from './User';

export interface Product {
  id: string;
  name: string;
  state: string;
  description: string;
  isValidated: boolean;
  reasonNotValidated: string;
  seller: User;
  adress: string;
  //0 = donner
  //1 = vendre
  //2 = troquer
  //3 = all
  sentType: number;
  price: number;
}
