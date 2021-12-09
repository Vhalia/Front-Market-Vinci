import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private sessionStorageService : SessionStorageService,
    private router: Router) {}

  ngOnInit(): void {
    if(this.sessionStorageService.getFromSessionStorage('user') !== undefined){
      this.sessionStorageService.deleteFromSessionStorage('user')
      this.router.navigate(['/']); 
      location.reload();  
    }
    else{
      this.router.navigate(['/']); 
    }
      
     
  }

}
