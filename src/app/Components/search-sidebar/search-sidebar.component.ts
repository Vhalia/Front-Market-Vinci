import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
})
export class SearchSidebarComponent implements OnInit {
  minPrice = 0;
  maxPrice = 500;
  priceRange = [this.minPrice, this.maxPrice];
  selectedSentType: string = '';
  selectedCategories: string[] = [];
  radioValue = 'donner';
  allChecked = false;

  //TODO: changer value en id de categorie
  listCategorie = [
    { label: 'Maison et Jardin', value: '1', checked: false },
    { label: 'Famille', value: '2', checked: false },
    {
      label: 'Vêtements et accessoires',
      value: '3',
      checked: false,
    },
    { label: 'Loisirs - hobbys', value: '4', checked: false },
    { label: 'Electronique', value: '5', checked: false },
  ];

  constructor() {}
  ngOnInit(): void {}

  parserEuro = (value: string): string => value.replace('€ ', '');
  formatterEuro = (value: number): string => `${value} €`;

  sort(): void {}

  onAfterSliderChange(value: number[] | number) {
    console.log(`value: ${value}`);
    this.sort();
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
