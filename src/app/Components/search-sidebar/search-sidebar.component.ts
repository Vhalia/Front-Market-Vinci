import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.css'],
})
export class SearchSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  minPriceAll: number = 0;
  maxPriceAll: number = 500;
  @Input() minPrice: number = this.minPriceAll;
  @Input() maxPrice: number = this.maxPriceAll;
  @Input() selectedCategories: number[] = [];
  @Input() type: number = 3;

  priceRange = [this.minPrice, this.maxPrice];
  selectedSentType: string = '';
  allChecked = false;

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

  async onSubmit() {
    await this.router.navigate(['/recherche'], {
      queryParams: {
        minPrice: this.priceRange[0],
        maxPrice: this.priceRange[1],
        type: this.type,
        cat: this.getSelectedCategories(),
      },
    });
    location.reload();
  }

  async onReset() {
    this.minPrice = 0;
    this.maxPrice = this.maxPriceAll;
    this.type = 3;
    this.selectedCategories = [];
    await this.router.navigate(['/recherche']);
    location.reload();
  }

  getSelectedCategories(): string {
    let retour: string = '';
    this.listCategorie.forEach((element) => {
      if (element.checked) retour = retour.concat(String(element.value), ',');
    });
    retour = retour.slice(0, retour.length - 1);
    return retour;
  }
}
