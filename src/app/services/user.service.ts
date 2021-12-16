import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Model/User';
import { catchError, Observable, tap } from 'rxjs';
import { uploadFileRequest } from '../Model/UploadFileRequest';
import { Product } from '../Model/Product';
import { Rating } from '../Model/Rating';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(
      'https://vinci-treasures-back.azurewebsites.net/users'
    );
  }

  login(userToConnect: User): Observable<User> {
    return this.http.post<User>(
      'https://vinci-treasures-back.azurewebsites.net/login',
      userToConnect,
      this.httpOptions
    );
  }

  getOne(mail: string): Observable<User> {
    return this.http.get<User>(
      'https://vinci-treasures-back.azurewebsites.net/users/' + mail
    );
  }

  createOne(userToCreate: User): Observable<User> {
    let obj = this.http.post<User>(
      'https://vinci-treasures-back.azurewebsites.net/users',
      userToCreate,
      this.httpOptions
    );
    return obj;
  }

  updateOne(id: string, userToUpdate: User): Observable<User> {
    return this.http.patch<User>(
      'https://vinci-treasures-back.azurewebsites.net/users/' + id,
      userToUpdate,
      this.httpOptions
    );
  }

  updateImage(image: uploadFileRequest, idUser: string): Observable<any> {
    console.log(idUser)
    console.log(image)

    return this.http.put<User>(
      'https://vinci-treasures-back.azurewebsites.net/users/imageContent/' + idUser,
      image,
      this.httpOptions
    );
  }

  getBoughtProduct(idUser: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      'https://vinci-treasures-back.azurewebsites.net/users/boughtProduct/' +
        idUser
    );
  }

  getSoldProduct(idUser: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      'https://vinci-treasures-back.azurewebsites.net/users/soldProduct/' +
        idUser
    );
  }

  patchRates(rate: Rating): Observable<any> {
    return this.http.patch<any>(
      'https://vinci-treasures-back.azurewebsites.net/users/soldProduct/',
      rate,
      this.httpOptions
    );
  }
}
