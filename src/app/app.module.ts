import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchComponent } from './Components/search/search.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './Components/add-product/add-product.component'; 


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    ProfileComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzGridModule,
    NzListModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
