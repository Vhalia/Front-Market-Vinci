import {User} from './User'

export interface Product{

    id : string;
    name : string;
    state : string;
    description : string;
    isValidated : boolean;
    reasonNotValidated : string;
    //seller : User;
    adress : string;
    sentType : string;
}