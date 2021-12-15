import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { User } from 'src/app/Model/User';
import { ProductService } from 'src/app/services/product.service';
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
    private userService: UserService
  ) {}

  id: string = '';
  product!: Product;
  user!: User;
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

  async ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any = params.get('id');
    this.id = tmp;
    await this.getProduct();
  }

  async getProduct() {
    this.productService.getById(this.id).subscribe({
      next: (v) => {
        this.product = v;
      },
      error: (e) => {
        this.isAnError = true;
        this.errorMessage = e.message;
        this.isLoading = false;
      },
      complete: () => {
        this.userService.getOne(this.product.sellerMail).subscribe({
          next: (v) => {
            this.user = v;
          },
          error: (e) => {
            this.isAnError = true;
            this.errorMessage = e.message;
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
            this.isLoading = false;
          },
        });
      },
    });
  }
  
}
