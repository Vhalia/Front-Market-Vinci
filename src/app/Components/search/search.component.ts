import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/Product';
import { ProductService } from '../../services/product.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  prods: Product[] = [];
  filtredProducts: Product[] = [];
  isLoading: boolean = true;

  //Filter settings
  productName: string = '';
  minPrice: number = -1;
  maxPrice: number = -1;
  type: string = 'Tous';
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.loadQueryParams();

    this.prods = await lastValueFrom(this.productService.getAll());
    this.filtredProducts = this.prods;
    this.filterList();
    this.isLoading = false;
  }

  filterList() {
    this.filtredProducts = this.filtredProducts.filter(
      (elt) => elt.isValidated
    );

    this.filtredProducts = this.filtredProducts.filter(
      (elt) => this.type === 'Tous' || elt.sentType == this.type
    );
    if (this.maxPrice !== 0) {
      this.filtredProducts = this.filtredProducts.filter(
        (elt) => this.maxPrice >= elt.price && elt.price >= this.minPrice
      );
    }
    this.filtredProducts = this.filtredProducts.filter(
      (elt) => this.minPrice <= elt.price
    );
    if (this.categories.length !== 0) {
      this.filtredProducts = this.filtredProducts.filter((elt) =>
        this.categories.includes(elt.type)
      );
    }
    if (this.productName != '') {
      this.filtredProducts = this.filtredProducts.filter((elt) =>
        elt.name.includes(this.productName)
      );
    }
  }

  async loadQueryParams() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any;

    //name
    tmp = params.get('name');
    if (tmp != null) {
      this.productName = tmp.trim();
    }

    //minPrice
    tmp = Number(params.get('minPrice'));
    tmp <= 0 ? (this.minPrice = 0) : (this.minPrice = tmp);

    //maxPrice
    tmp = Number(params.get('maxPrice'));
    tmp < 0 ? (this.maxPrice = 10000000000) : (this.maxPrice = tmp);

    //sentType
    tmp = params.get('type');
    if (tmp === 'ADonner' || tmp === 'AVendre' || tmp === 'AEchanger')
      this.type = tmp;
    else this.type = 'Tous';

    //Categories
    tmp = params.get('cat');
    if (tmp !== null) {
      let tempS: string[] = tmp.split(',');
      if (tmp.length === 0) this.categories = [];
      else this.categories = tempS.map((item) => item);
    }
    return;
  }
}
