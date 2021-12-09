import { Injectable } from '@angular/core';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  addToSessionStorage(name: string , value : Object) : void {
    sessionStorage.setItem(name, JSON.stringify(value));  
  }

  getFromSessionStorage(name: string) : any {
    let myObject = sessionStorage.getItem(name)
    if(myObject != undefined)
      return JSON.parse(myObject);
    return undefined;
  }
}
