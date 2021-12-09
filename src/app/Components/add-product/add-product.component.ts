import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private sessionStorageService : SessionStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.sessionStorageService.getFromSessionStorage('user') === undefined)
      this.router.navigate(['/']);
  }

}
