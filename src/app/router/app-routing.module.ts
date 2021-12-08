import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { SearchComponent } from '../Components/search/search.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { AddProductComponent } from '../Components/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recherche', component: SearchComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'ajouter', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
