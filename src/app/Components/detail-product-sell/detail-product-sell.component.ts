import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-product-sell',
  templateUrl: './detail-product-sell.component.html',
  styleUrls: ['./detail-product-sell.component.css']
})
export class DetailProductSellComponent implements OnInit {

  validateForm!: FormGroup;
  mailIsValid: boolean = false;
  errorMsg: string = "";
  client = {} as User;
  userMails: string[] = [];

  @Input()
  displaySell!: boolean;

  @Input()
  idProduct!: string;


  constructor(
    private fb: FormBuilder, 
    private userService : UserService,
    private productService : ProductService,
    private sessionService : SessionStorageService
    ) { }

  async ngOnInit() {
    this.validateForm = this.fb.group({
      clientMail: [null, [Validators.required]],
    });
    this.userMails = await this.getUserMails();
  }

  async checkMailValidity(value : any) {
    let accepted = this.userMails.includes(value.clientMail);
    if(!accepted){
      this.mailIsValid = false;
      this.errorMsg = "Veuillez entrer un mail existant";
    } else if(value.clientMail === this.sessionService.getFromSessionStorage("user").mail){
      this.mailIsValid = false;
      this.errorMsg = "Vous ne pouvez pas entrer votre propre mail";
    } else {
      this.mailIsValid = true;
    }
  }

  async submitMail(value : any) {
    
    if(this.mailIsValid){
      this.client = await this.getUser(value.clientMail);
      await this.sellProduct(this.idProduct, this.client.id);
      location.reload();
    }    
  }

  displaySellInput(): void {
    this.displaySell = true;
  }
  
  //Methods calling service
  async getUser(mail : string): Promise<User> {
    return await lastValueFrom(this.userService.getOne(mail));
  }

  async sellProduct(idProduct : string, idClient : string): Promise<Product> {
    return await lastValueFrom(this.productService.sellProduct(idProduct, idClient));
  }

  async getUserMails(): Promise<string[]> {
    return await lastValueFrom(this.userService.getUserMails());
  }

}
