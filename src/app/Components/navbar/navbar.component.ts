import { Component, OnInit, HostListener } from '@angular/core';
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
  imageUrl: string = '';
  listOfPosition: NzPlacementType[] = ['bottomRight'];
  isConnected = false;
  isAdmin = false;
  searchInput: string = '';

  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sessionService.getFromSessionStorage('user') !== undefined) {
      this.isConnected = true;
      this.imageUrl = this.sessionService.getFromSessionStorage('user').image;
      if (this.sessionService.getFromSessionStorage('user').isAdmin) {
        this.isAdmin = true;
      }
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

  async profileNavigate() {
    await this.router.navigate(['/profil'], {
      queryParams: {
        mail: this.sessionService.getFromSessionStorage('user').mail,
      },
    });
    location.reload();
  }
}
function keyEvent(
  event: Event | undefined,
  KeyboardEvent: {
    new (
      type: string,
      eventInitDict?: KeyboardEventInit | undefined
    ): KeyboardEvent;
    prototype: KeyboardEvent;
    readonly DOM_KEY_LOCATION_LEFT: number;
    readonly DOM_KEY_LOCATION_NUMPAD: number;
    readonly DOM_KEY_LOCATION_RIGHT: number;
    readonly DOM_KEY_LOCATION_STANDARD: number;
  }
) {
  throw new Error('Function not implemented.');
}
