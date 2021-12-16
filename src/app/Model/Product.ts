import { uploadFileRequest } from './UploadFileRequest';
import { User } from './User';

export interface Product {
  id: string;
  name: string;
  state: string;
  description: string;
  isValidated: boolean;
  reasonNotValidated: string;
  sellerId: string;
  sellerMail: string;
  adress: string;
  //0 = donner
  //1 = vendre
  //2 = troquer
  //3 = all
  sentType: string;
  price: number;
  type: string;
  medias: uploadFileRequest[];
  video: uploadFileRequest;
  blobMedias: string[];
  blobVideo: string;
}
