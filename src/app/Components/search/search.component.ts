import { NONE_TYPE } from '@angular/compiler';
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
  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
          'Bonjour, JPP. Il est insuportable! Bonjour, JPP. Il est insuportable!',
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
    console.log(this.prods);
    //this.getAll();
  }

  getAll(): void {
    this.productService.getAll().subscribe((prods) => {
      this.prods = prods;
      console.log(prods);
    });
  }
}
