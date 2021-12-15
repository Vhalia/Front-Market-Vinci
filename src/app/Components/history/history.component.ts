import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  boughtProducts: Product[] = [];
  soldProducts : Product[] = [];

  user = {} as User;

  constructor(
    private userService : UserService, 
    private productService : ProductService,
    private sessionService : SessionStorageService, 
    private router: Router,
    ) { }

  async ngOnInit(){
    if(this.sessionService.getFromSessionStorage("user") === undefined){
      this.router.navigate(['/']);
    } else {
      this.user = await this.getUser(this.sessionService.getFromSessionStorage("user").mail);

      this.user.bought.forEach(async productId => {
        let product = await this.getProduct(productId);
        this.boughtProducts.push(product);
      });

      this.user.sold.forEach(async productId => {
        let product = await this.getProduct(productId);
        this.soldProducts.push(product);
      });

    }
  }

  async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

  async getProduct(id : string): Promise<Product> {
    return await lastValueFrom(this.productService.getById(id));
  }

}
