import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToSessionStorage(name: string , value : Object) : void {
    sessionStorage.setItem(name, JSON.stringify(value));  
  }

  getFromSessionStorage(name: string) : Object {
    return JSON.parse(sessionStorage.getItem(name) || '{}');
  }
}
