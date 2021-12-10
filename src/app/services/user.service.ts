import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/User';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>("https://vinci-treasures-back.azurewebsites.net/users")
      .pipe(tap(_ => console.log('fetched Products')),);
  }

  login(userToConnect : User): Observable<User> {
    return this.http.post<User>("https://vinci-treasures-back.azurewebsites.net/login",userToConnect, this.httpOptions )
    .pipe(tap(_ => console.log('fetched user')),);
  }
    
  getOne(mail: string): Observable<User> {
    return this.http.get<User>("https://vinci-treasures-back.azurewebsites.net/users/" + mail)
      .pipe(tap(_ => console.log('fetched user')));
  }

  createOne(userToCreate : User): Observable<User> {
    console.log('ici')
    let obj = this.http.post<User>("https://vinci-treasures-back.azurewebsites.net/users",userToCreate, this.httpOptions )
    .pipe(tap(_ => console.log('fetched user')),);
    console.log(obj)
    return obj;
  }

  updateOne(id: string, userToUpdate: User): Observable<User> {
    return this.http.patch<User>("https://vinci-treasures-back.azurewebsites.net/users/" + id, userToUpdate, this.httpOptions)
      .pipe(tap(_ => console.log('user updated')));
  }

}