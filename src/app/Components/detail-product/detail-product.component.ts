import { Component, OnInit } from '@angular/core';
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
    private sessionService : SessionStorageService,
    private router: Router
  ) {}

  idProduct: string = '';
  product!: Product;
  user!: User;
  isLoading: boolean = true;
  containVideo: boolean = false;
  average: number = 0;
  hasAnAverage: boolean = false;
  dictSentType: Map<string, string> = new Map([
    ['ADonner', 'A Donner'],
    ['AVendre', 'A Vendre'],
    ['AEchanger', 'A Echanger'],
    ['Tous', 'Tous'],
  ]);
  isAnError: boolean = false;
  errorMessage: string = '';
  productState: string = '';
  productSeller: string = '';
  productIsSold: boolean = false;
  ownProduct: boolean = false;

  async ngOnInit() {
    if (this.sessionService.getFromSessionStorage('user') === undefined)
      this.router.navigate(['/login']);
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any = params.get('id');
    this.idProduct = tmp;
    await this.getProduct();
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
            if(this.product.state === "Envoye"){
              this.productIsSold = true;
            }
            
            if(this.product.sellerMail === this.sessionService.getFromSessionStorage("user").mail){
              this.ownProduct = true;
            }
            
            this.isLoading = false;
            
          },
        });
      },
    });
  }

  async deleteThisProduct() {
    await this.deleteProduct()
    this.router.navigate(['/'])
  }

  private async deleteProduct() : Promise<void>{
    this.productService.deleteProduct(this.idProduct)
  }
}
