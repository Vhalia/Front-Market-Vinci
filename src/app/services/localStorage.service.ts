import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToLocalStorage(name: string , value : Object) : void {
    localStorage.setItem(name, JSON.stringify(value));  
  }

  getFromLocalStorage(name: string) : Object {
    return JSON.parse(localStorage.getItem(name) || '{}');
  }
}
