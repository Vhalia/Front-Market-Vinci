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
  minPrice: number = -1;
  maxPrice: number = -1;
  type: number = 3;
  categories: number[] = [];

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
    //TODO : ajouter filtre pour produits validés
    this.filtredProducts = this.filtredProducts.filter(
      (elt) => this.type == 3 || elt.sentType == this.type
    );
    if (this.maxPrice !== 0) {
      this.filtredProducts = this.filtredProducts.filter(
        (elt) => this.maxPrice >= elt.price && elt.price >= this.minPrice
      );
    }
    this.filtredProducts = this.filtredProducts.filter(
      (elt) => this.minPrice <= elt.price
    );
    //TODO: ajouter filtre par catégorie quand back sera impl
  }

  async loadQueryParams() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any;

    //minPrice
    tmp = Number(params.get('minPrice'));
    tmp <= 0 ? (this.minPrice = 0) : (this.minPrice = tmp);

    //maxPrice
    tmp = Number(params.get('maxPrice'));
    tmp < 0 ? (this.maxPrice = 10000000000) : (this.maxPrice = tmp);

    //sentType
    tmp = params.get('type');
    if (tmp == 0 || tmp == 2 || tmp == 1) this.type = Number(tmp);
    else this.type = 3;

    //Categories
    tmp = params.get('cat');
    if (tmp !== null) {
      let tempS: string[] = tmp.split(',');
      if (tmp.length === 0) this.categories = [];
      else this.categories = tempS.map((item) => Number(item));
    }
    return;
  }
}
