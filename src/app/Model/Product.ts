import { uploadFileRequest } from "./UploadFileRequest";

export interface Product {
  id: string;
  name: string;
  state: string;
  description: string;
  isValidated: boolean;
  reasonNotValidated: string;
  sellerId: string;
  adress: string;
  //0 = donner
  //1 = vendre
  //2 = troquer
  //3 = all
  sentType: number;
  price: number;
  medias : uploadFileRequest[]
}
