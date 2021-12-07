import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../Components/home/home.component'
import { SearchComponent } from '../Components/search/search.component';
import { ProfileComponent } from '../Components/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'recherche', component: SearchComponent},
  {path:'profil', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
