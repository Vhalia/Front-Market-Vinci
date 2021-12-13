import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Input() adress!: string;

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.849742, 4.454206],
      zoom: 17,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    L.marker([50.849742, 4.454206]).addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    //TODO: add transform string address to coordonates
    this.initMap();
  }
}
