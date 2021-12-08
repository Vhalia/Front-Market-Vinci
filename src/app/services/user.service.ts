import { Injectable } from '@angular/core';

import {HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>("https://vinci-treasures-back.azurewebsites.net/users")
      .pipe(tap(_ => console.log('fetched Products')),);
  }

}