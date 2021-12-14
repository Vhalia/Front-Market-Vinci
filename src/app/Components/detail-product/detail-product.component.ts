import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {

  id: string = '';
  product!: Product;
  isLoading: boolean = true;
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private sessionStorageService: SessionStorageService,
    private router : Router
  ) {}

  async ngOnInit() {
    await this.loadProduct();
    this.isLoading = false;

    if(this.product.isValidated === true){
      return;
    }

    if(this.product.isValidated === false && (this.sessionStorageService.getFromSessionStorage('user').id == this.product.sellerId||this.sessionStorageService.getFromSessionStorage('user').isAdmin === true)){
      return;
    }
    else {
      this.router.navigate(['/'])
    }
  }  

  async loadProduct() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any = params.get('id');
    this.id = tmp;
    /*this.productService.getById(this.id).subscribe({
      next: (v) => {
        this.product = v;
      },
      error: (e) => {
        this.isAnError = true;
        this.errorMessage = e.message;
        this.isLoading = false;
      },
      complete: () => {
        this.isAnError = false;
        if (!this.isAnError && this.product.seller.ratings.length !== 0) {
          let ratings = this.product.seller.ratings;
          ratings.forEach((rating) => {
            this.average += rating.like;
          });
          this.average =
            Math.round((this.average / ratings.length) * 100) / 100;
          this.hasAnAverage = true;
        }
        this.isLoading = false;
      },
    });*/
  }
}
