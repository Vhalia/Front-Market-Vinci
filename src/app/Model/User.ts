import { Product } from './Product';
import { Rating } from './Rating';

export interface User {
  id: string;
  name: string;
  surname: string;
  mail: string;
  campus: string;
  password: string;
  isBanned: boolean;
  isAdmin: boolean;
  ratings: Rating[];
  image: string;
  favTypes: undefined;
  sold: string[];
  bought: string[];
  favProducts: string[];
  //   badges:
}
