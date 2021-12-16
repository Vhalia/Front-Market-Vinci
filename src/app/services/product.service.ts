import { Injectable } from '@angular/core';
import {
  ClientSecretCredential,
  DefaultAzureCredential,
  InteractiveBrowserCredential,
} from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Model/Product';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  secret_name = 'GeoCodingApiKey';
  credential = new InteractiveBrowserCredential({
    clientId: environment.AZURE_CLIENT_ID,
  });

  URL = 'https://vinci-treasures-vault.vault.azure.net/';
  client = new SecretClient(this.URL, this.credential);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      'https://vinci-treasures-api.azurewebsites.net/products'
    );
  }

  getById(productId: string): Observable<Product> {
    return this.http.get<Product>(
      'https://vinci-treasures-api.azurewebsites.net/products/' + productId
    );
  }

  createOne(productToCreate: Product): Observable<Product> {
    let obj = this.http.post<Product>(
      'https://vinci-treasures-api.azurewebsites.net/products',
      productToCreate,
      this.httpOptions
    );
    return obj;
  }

  getNotValidated(): Observable<Product[]> {
    return this.http.get<Product[]>(
      'https://vinci-treasures-api.azurewebsites.net/products/notValidated'
    );
  }

  patchProduct(id: string, body: any): Observable<Product> {
    return this.http.patch<Product>(
      'https://vinci-treasures-api.azurewebsites.net/products/' +
        id +
        '/validate',
      body,
      this.httpOptions
    );
  }

  async getCoordonates(address: string): Promise<Observable<any>> {
    // const api_key = await this.client.getSecret(this.secret_name);
    let api_key = 'ae7cd0a400d849caa37a3fc3e45c52ed';
    let url: string =
      'https://api.opencagedata.com/geocode/v1/json?key=' +
      api_key +
      '&q=' +
      address;
    return this.http.get(url);
  }

  sellProduct(idProduct: string, idClient: string): Observable<Product> {
    return this.http
      .patch<Product>(
        'https://vinci-treasures-api.azurewebsites.net/products/sell/' +
          idProduct +
          '/' +
          idClient,
        this.httpOptions
      )
      .pipe(tap((_) => console.log('sold product')));
  }

  deleteProduct(idProduct: string): void {
    this.http
      .delete(
        'https://vinci-treasures-api.azurewebsites.net/products/' + idProduct
      )
      .subscribe();
  }

  updateProduct(product: Product): Observable<Product> {
    console.log(product);

    return this.http.patch<Product>(
      'https://vinci-treasures-api.azurewebsites.net/products/' + product.id,
      product,
      this.httpOptions
    );
  }
}
