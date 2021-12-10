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

import { SearchSidebarComponent } from './Components/search-sidebar/search-sidebar.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AdminComponent } from './Components/admin/admin.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ICONS
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
//ADD ICONS HERE
import { LikeOutline, DislikeOutline } from '@ant-design/icons-angular/icons';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileElementComponent } from './Components/profile-element/profile-element.component';
const icons: IconDefinition[] = [ LikeOutline, DislikeOutline ];


@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    ProfileComponent,
    SearchSidebarComponent,
    AddProductComponent,
    AddProductComponent,
    AdminComponent,
    RegisterComponent,
    LoginComponent,
    ProfileElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DemoNgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule,
    NzIconModule.forRoot(icons),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
