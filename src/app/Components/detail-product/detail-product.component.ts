import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/services/product.service';

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
  dictSentType: string[] = ['A Donner', 'A Vendre', 'A Troquer', 'Tous'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.loadProduct();
    this.isLoading = false;
    console.log(this.product);
  }

  async loadProduct() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any = params.get('id');
    this.id = tmp;
    console.log(this.id);
    this.product = await lastValueFrom(this.productService.getById(this.id));
    if (this.product.seller.ratings.length !== 0) {
      let ratings = this.product.seller.ratings;
      ratings.forEach((rating) => {
        this.average += rating.like;
      });
      this.average = Math.round((this.average / ratings.length) * 100) / 100;
      this.hasAnAverage = true;
    }
  }
}
