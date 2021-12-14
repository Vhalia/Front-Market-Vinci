import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  imageUrl = '../../../assets/default_profil.jpg';
  listOfPosition: NzPlacementType[] = ['bottomRight'];
  isConnected = false;
  searchInput: string = '';

  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sessionService.getFromSessionStorage('user') != undefined) {
      this.isConnected = true;
    }
  }

  async submitSearch() {
    await this.router.navigate(['/recherche'], {
      queryParams: {
        name: this.searchInput,
      },
    });
    location.reload();
  }
}
