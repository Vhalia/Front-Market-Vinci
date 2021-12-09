import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  prods: Product[] = [];
  filtredProducts: Product[] = [];
  isLoading: boolean = false;

  //Filter settings
  minPrice: number = -1;
  maxPrice: number = -1;
  type: string = 'all';
  categories: number[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.loadQueryParams();

    //replace by this.getAll();
    this.prods = [
      {
        id: '1',
        name: 'fer a repasser',
        state: 'en vente',
        description: "Bonjour, je n'en peux plus. Il est insuportable",
        isValidated: true,
        reasonNotValidated: '',
        adress: '43 clo chapelle au champs, 1200 Bruxelles',
        sentType: 'A troquer',
      },
      {
        id: '2',
        name: 'fer a repasser 2',
        state: 'a donner',
        description:
          'Bonjour, JPP. Il est insuportable! Bonjour, JPP. Il est insuportable!Bonjour, JPP. Il est insuportable!Bonjour, JPP. Il est insuportable!',
        isValidated: true,
        reasonNotValidated: '',
        adress: '41 clo chapelle au champs, 1200 Bruxelles',
        sentType: 'A donner',
      },
      {
        id: '3',
        name: 'un objet random',
        state: 'a troquer',
        description: "Bonjour, je sais pas ce que c'est",
        isValidated: true,
        reasonNotValidated: '',
        adress: '41 clo chapelle au champs, 1200 Bruxelles',
        sentType: 'A troquer',
      },
      {
        id: '3',
        name: 'un objet random',
        state: 'a troquer',
        description: "Bonjour, je sais pas ce que c'est",
        isValidated: true,
        reasonNotValidated: '',
        adress: '41 clo chapelle au champs, 1200 Bruxelles',
        sentType: 'A troquer',
      },
    ];
    this.filtredProducts = this.prods;
  }

  async loadQueryParams() {
    const params = this.activatedRoute.snapshot.queryParamMap;
    let tmp: any;

    //minPrice
    tmp = Number(params.get('minPrice'));
    tmp <= 0 ? (this.minPrice = 0) : (this.minPrice = tmp);

    //maxPrice
    tmp = Number(params.get('maxPrice'));
    tmp < 0 ? (this.maxPrice = 0) : (this.maxPrice = tmp);

    //sentType
    tmp = params.get('type');
    if (tmp === 'donner' || tmp === 'troquer' || tmp === 'vendre')
      this.type = tmp;
    else this.type = 'all';

    //Categories
    tmp = params.get('cat');
    if (tmp !== null) {
      let tempS: string[] = tmp.split(',');
      if (tmp.length === 0) this.categories = [];
      else this.categories = tempS.map((item) => Number(item));
    }

    return;
  }

  getAll(): void {
    this.productService.getAll().subscribe((prods) => {
      this.prods = prods;
    });
  }
}
