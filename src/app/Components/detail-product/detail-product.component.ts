import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  isLoading: boolean = true;
  isInEditMode: boolean = false;
  isAnError: boolean = false;

  idProduct: string = '';
  product!: Product;
  user!: User;
  containVideo: boolean = false;
  average: number = 0;
  hasAnAverage: boolean = false;
  dictSentType: Map<string, string> = new Map([
    ['ADonner', 'A Donner'],
    ['AVendre', 'A Vendre'],
    ['AEchanger', 'A Echanger'],
    ['Tous', 'Tous'],
  ]);
  errorMessage: string = '';
  productState: string = '';
  productSeller: string = '';
  productIsSold: boolean = false;
  ownProduct: boolean = false;
  validateForm!: FormGroup;

  async ngOnInit() {
    if (this.sessionService.getFromSessionStorage('user') === undefined)
      this.router.navigate(['/']);
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any = params.get('id');
    this.idProduct = tmp;
    await this.getProduct();
  }

  toggleEditMode() {
    this.isInEditMode = true;
  }

  async getProduct() {
    this.productService.getById(this.idProduct).subscribe({
      next: (v) => {
        this.product = v;
      },
      error: (e) => {
        this.isAnError = true;
        this.errorMessage = e.error.message;
        this.isLoading = false;
      },
      complete: () => {
        if (this.product.blobVideo !== '') {
          this.containVideo = true;
        }
        this.userService.getOne(this.product.sellerMail).subscribe({
          next: (v) => {
            this.user = v;
          },
          error: (e) => {
            this.isAnError = true;
            this.errorMessage = e.error.message;
            this.isLoading = false;
          },
          complete: () => {
            if (!this.isAnError && this.user.ratings.length !== 0) {
              let ratings = this.user.ratings;
              ratings.forEach((rating) => {
                this.average += rating.like;
              });
              this.average =
                Math.round((this.average / ratings.length) * 100) / 100;
              this.hasAnAverage = true;
            }
            if (this.product.state === 'Envoye') {
              this.productIsSold = true;
            }

            if (
              this.product.sellerMail ===
              this.sessionService.getFromSessionStorage('user').mail
            ) {
              this.ownProduct = true;
            }

            this.isLoading = false;
          },
        });
      },
    });
  }

  async submitForm() {
    let newProduct = {} as Product;
    newProduct.id = this.product.id;
    newProduct.type = this.product.type;
    newProduct.name = this.product.name;
    newProduct.description = this.product.description;
    newProduct.adress = this.product.adress;
    newProduct.sentType = this.product.sentType;
    newProduct.sellerId = this.sessionService.getFromSessionStorage('user').id;
    if (this.product.sentType === 'AVendre') {
      newProduct.price = this.product.price;
    } else {
      newProduct.price = 0;
    }

    let newProd = await lastValueFrom(
      this.productService.updateProduct(newProduct)
    );
    this.isInEditMode = false;
  }

  cancelForm() {
    this.ngOnInit();
    this.isInEditMode = false;
  }
}
