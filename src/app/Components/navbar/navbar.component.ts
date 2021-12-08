import { Component, OnInit } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listOfPosition: NzPlacementType[] = ['bottomRight'];


  constructor() { }

  ngOnInit(): void {
  }

}
