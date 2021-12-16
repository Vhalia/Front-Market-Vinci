import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/User';
import { catchError, Observable, tap } from 'rxjs';
import { uploadFileRequest } from '../Model/UploadFileRequest';
import { Product } from '../Model/Product';

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
      .pipe(tap(_ => console.log('fetched user')),);
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
    let obj = this.http.post<User>("https://vinci-treasures-back.azurewebsites.net/users",userToCreate, this.httpOptions )
    .pipe(tap(_ => console.log('fetched user')),);
    console.log(obj)
    return obj;
  }

  updateOne(id: string, userToUpdate: User): Observable<User> {
    return this.http.patch<User>("https://vinci-treasures-back.azurewebsites.net/users/" + id, userToUpdate, this.httpOptions)
      .pipe(tap(_ => console.log('user updated')));
  }

  updateImage(image : uploadFileRequest, idUser : string): Observable<User> {
    return this.http.patch<User>("https://vinci-treasures-back.azurewebsites.net/users/" + idUser, image, this.httpOptions)
      .pipe(tap(_ => console.log('user updated')));
  }

  getBoughtProduct(idUser : string): Observable<Product[]> {
    return this.http.get<Product[]>("https://vinci-treasures-back.azurewebsites.net/users/boughtProduct/"+ idUser)
      .pipe(tap(_ => console.log('fetched Products')),);
  }

  getSoldProduct(idUser : string): Observable<Product[]> {
    return this.http.get<Product[]>("https://vinci-treasures-back.azurewebsites.net/users/soldProduct/"+ idUser)
      .pipe(tap(_ => console.log('fetched Products')),);
  }

  getUserMails(): Observable<string[]> {
    return this.http.get<string[]>("https://vinci-treasures-back.azurewebsites.net/users/mail")
      .pipe(tap(_ => console.log('received mails')));
  }

}