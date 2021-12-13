import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Model/Product';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>('https://vinci-treasures-back.azurewebsites.net/products')
      .pipe(tap((_) => console.log('fetched Products')));
  }

  createOne(productToCreate : Product): Observable<Product> {
    let obj = this.http.post<Product>("https://vinci-treasures-back.azurewebsites.net/products",productToCreate, this.httpOptions )
    .pipe(tap(_ => console.log('fetched product')),);
    console.log(obj)
    return obj;
  }
}
