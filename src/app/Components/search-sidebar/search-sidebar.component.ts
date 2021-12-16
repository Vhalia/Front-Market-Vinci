import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
})
export class SearchSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  dictSentType: Map<string, string> = new Map([
    ['ADonner', 'A Donner'],
    ['AVendre', 'A Vendre'],
    ['AEchanger', 'A Echanger'],
    ['Tous', 'Tous'],
  ]);

  minPriceAll: number = 0;
  maxPriceAll: number = 500;
  @Input() productName: string = '';
  @Input() minPrice: number = this.minPriceAll;
  @Input() maxPrice: number = this.maxPriceAll;
  @Input() selectedCategories: string[] = [];
  @Input() type: string = 'Tous';
  @Output() refreshSearchList = new EventEmitter<string>();

  priceRange = [this.minPrice, this.maxPrice];
  selectedSentType: string = '';
  allChecked = false;

  listCategorie = [
    {
      label: 'Maison et Jardin',
      value: 'Jardin',
      checked: false,
    },
    {
      label: 'Famille',
      value: 'Famille',
      checked: false,
    },
    {
      label: 'Vêtements et accessoires',
      value: 'Vetements',
      checked: false,
    },
    {
      label: 'Loisirs - hobbys',
      value: 'Loisirs',
      checked: false,
    },
    {
      label: 'Electronique',
      value: 'Electroniques',
      checked: false,
    },
  ];

  ngOnInit(): void {
    if (this.maxPrice === 0)
      this.priceRange = [this.minPrice, this.maxPriceAll];
    else this.priceRange = [this.minPrice, this.maxPrice];

    this.listCategorie.forEach(
      (elt) => (elt.checked = this.selectedCategories.includes(elt.value))
    );
  }

  onSliderChange(value: number[]) {
    this.priceRange = value;
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

  async onReset() {
    this.productName = '';
    this.minPrice = 0;
    this.maxPrice = -1;
    this.priceRange = [0, 500];
    this.type = 'Tous';
    this.selectedCategories = [];
    this.listCategorie.forEach((elt) => (elt.checked = false));
    await this.router.navigate(['/recherche']);
    this.refreshSearchList.emit('submit');
  }

  getSelectedCategories(): string {
    let retour: string = '';
    this.listCategorie.forEach((element) => {
      if (element.checked) retour = retour.concat(String(element.value), ',');
    });
    retour = retour.slice(0, retour.length - 1);
    return retour;
  }

  async onSubmit() {
    console.log(this.priceRange[0]);

    let queryParams = new Map();
    if (this.productName != '') queryParams.set('name', this.productName);
    if (this.priceRange[0] != 0)
      queryParams.set('minPrice', this.priceRange[0]);
    if (this.priceRange[1] != 500)
      queryParams.set('maxPrice', this.priceRange[1]);
    if (this.type != 'Tous') queryParams.set('type', this.type);
    if (this.getSelectedCategories() != '')
      queryParams.set('cat', this.getSelectedCategories());
    console.log(queryParams);

    await this.router.navigate(['/recherche'], {
      queryParams: {
        name: queryParams.get('name'),
        minPrice: queryParams.get('minPrice'),
        maxPrice: queryParams.get('maxPrice'),
        type: queryParams.get('type'),
        cat: queryParams.get('cat'),
      },
    });
    this.refreshSearchList.emit('submit');
  }
}
