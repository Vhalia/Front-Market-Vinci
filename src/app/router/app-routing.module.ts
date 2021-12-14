import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { SearchComponent } from '../Components/search/search.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { AddProductComponent } from '../Components/add-product/add-product.component';
import { AdminComponent } from '../Components/admin/admin.component';
import { LoginComponent } from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LogoutComponent } from '../Components/logout/logout.component';
import { DetailProductComponent } from '../Components/detail-product/detail-product.component';
import { ErrorComponent } from '../Components/error/error.component';
import { BadgeComponent } from '../Components/badge/badge.component';
import { HistoryComponent } from '../Components/history/history.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recherche', component: SearchComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'ajouter', component: AddProductComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'detail', component: DetailProductComponent },
  { path: 'badge', component: BadgeComponent },
  { path: '**', component: ErrorComponent },
  { path: 'historique', component: HistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
