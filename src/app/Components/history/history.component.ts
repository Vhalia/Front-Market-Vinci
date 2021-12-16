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
    private sessionService : SessionStorageService, 
    private router: Router,
    ) { }

  async ngOnInit(){
    if(this.sessionService.getFromSessionStorage("user") === undefined){
      this.router.navigate(['/']);
    } else {
      this.user = this.sessionService.getFromSessionStorage("user");

      let userConnected = await this.getUser(this.user.mail)
      this.user = userConnected
      this.sessionService.addToSessionStorage('user',userConnected)

      
      this.boughtProducts = await this.getBoughtProducts(this.user.id)
      this.soldProducts = await this.getSoldProducts(this.user.id)
    }
  }

  private async getBoughtProducts(id : string): Promise<Product[]> {
    return await lastValueFrom(this.userService.getBoughtProduct(id));
  }

  private async getSoldProducts(id : string): Promise<Product[]> {
    return await lastValueFrom(this.userService.getSoldProduct(id));
  }

  private async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

}
