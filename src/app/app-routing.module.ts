import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './auth-guard.guard';
import {AddUserComponent} from './board-admin/add-user/add-user.component';
import {LoanSearchComponent} from './loan-search/loan-search.component';
import { AddLoanInformationComponent } from './board-admin/add-loan-information/add-loan-information.component';
// import {LoanDetailsComponent} from './loan-search/loan-details/loan-details.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login/profile', component: ProfileComponent },
  { path: 'user', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: 'login/profile', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'addLoanInfo', component: AddLoanInformationComponent, canActivate: [AuthGuard]},
  { path: 'searchLoan', component: LoanSearchComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
