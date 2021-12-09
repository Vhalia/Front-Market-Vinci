import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
})
export class SearchSidebarComponent implements OnInit {
  minPriceAll: number = 0;
  maxPriceAll: number = 500;
  @Input() minPrice: number = this.minPriceAll;
  @Input() maxPrice: number = this.maxPriceAll;
  @Input() selectedCategories: number[] = [];
  @Input() type = '';

  priceRange = [this.minPrice, this.maxPrice];
  selectedSentType: string = '';
  allChecked = false;

  //TODO: changer value en id de categorie
  listCategorie = [
    {
      label: 'Maison et Jardin',
      value: 1,
      checked: false,
    },
    {
      label: 'Famille',
      value: 2,
      checked: false,
    },
    {
      label: 'Vêtements et accessoires',
      value: 3,
      checked: false,
    },
    {
      label: 'Loisirs - hobbys',
      value: 4,
      checked: false,
    },
    {
      label: 'Electronique',
      value: 5,
      checked: false,
    },
  ];

  constructor() {}
  ngOnInit(): void {
    if (this.maxPrice === 0)
      this.priceRange = [this.minPrice, this.maxPriceAll];
    else this.priceRange = [this.minPrice, this.maxPrice];

    this.listCategorie.forEach(
      (elt) => (elt.checked = this.selectedCategories.includes(elt.value))
    );
  }

  parserEuro = (value: string): string => value.replace('€ ', '');
  formatterEuro = (value: number): string => `${value} €`;

  onAfterSliderChange(value: number[] | number) {
    console.log(`value: ${value}`);
  }

  updateAllChecked(): void {
    if (this.allChecked) {
      this.listCategorie = this.listCategorie.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.listCategorie = this.listCategorie.map((item) => ({
        ...item,
        checked: false,
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.listCategorie.every((item) => !item.checked)) {
      this.allChecked = false;
    } else if (this.listCategorie.every((item) => item.checked)) {
      this.allChecked = true;
    }
  }

  onSubmit() {
    console.log('onSubmit');
    //redirect page with ?params
  }
}
