import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  constructor(private productService: ProductService) {}

  private map: any;
  @Input() adress!: string;
  longitude: number = 0;
  latitude: number = 0;

  ngAfterViewInit() {
    this.loadAddress();
  }

  private loadAddress() {
    this.productService.getCoordonates(this.adress).then((res) =>
      res.subscribe({
        next: (v) => {
          console.log(v.results[0]);
          this.latitude = v.results[0].geometry.lat;
          this.longitude = v.results[0].geometry.lng;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.initMap();
        },
      })
    );
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 17,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    const customMarker = new L.Icon({
      iconUrl:
        'https://image.winudf.com/v2/image1/Y29tLmV4bHlvLm1hcG1hcmtlcl9pY29uXzE2MzI4MzcwMzFfMDI5/icon.png?fakeurl=1&h=240&type=webp',
      iconSize: [48, 48],
    });
    L.marker([this.latitude, this.longitude], { icon: customMarker }).addTo(
      this.map
    );
  }
}
