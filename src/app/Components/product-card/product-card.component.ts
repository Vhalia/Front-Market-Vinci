import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(private router: Router) {}

  dictSentType: Map<string, string> = new Map([
    ['ADonner', 'A Donner'],
    ['AVendre', 'A Vendre'],
    ['ATroquer', 'A Troquer'],
    ['Tous', 'Tous'],
  ]);

  @Input()
  product!: Product;

  ngOnInit(): void {}

  async handleClick() {
    await this.router.navigate(['/detail'], {
      queryParams: {
        id: this.product.id,
      },
    });
  }
}
