import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './auth-guard.guard';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'login/profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard]},
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: 'login/profile', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin/adduser', component: AddUserComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }