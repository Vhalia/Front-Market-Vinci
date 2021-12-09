import { Component, OnInit } from '@angular/core';
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

  constructor(private sessionService : SessionStorageService) {}

  ngOnInit(): void {
    if(this.sessionService.getFromSessionStorage('user') != undefined){
      console.log(this.sessionService.getFromSessionStorage('user'))
      this.isConnected = true;
    }
  }
}
