import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor() {}

  dictSentType: string[] = ['A Donner', 'A Vendre', 'A Troquer', 'Tous'];

  @Input()
  product!: Product;

  ngOnInit(): void {}
}
