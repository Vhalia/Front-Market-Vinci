import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../Model/Product';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>('https://vinci-treasures-back.azurewebsites.net/products')
      .pipe(tap((_) => console.log('fetched Products')));
  }

  getById(productId: string): Observable<Product> {
    return this.http
      .get<Product>(
        'https://vinci-treasures-back.azurewebsites.net/products/' + productId
      )
      .pipe(tap((_) => console.log('fetched One Product')));
  }
}
