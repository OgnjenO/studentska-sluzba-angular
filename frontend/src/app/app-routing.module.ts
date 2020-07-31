import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { ManageUsersComponent } from './pages/admin/manage/users/users.component';
import { ManageClassesComponent } from './pages/admin/manage/classes/classes.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', redirectTo: 'admin/users', pathMatch: 'full' },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AuthGuard], data: {roles: [Role.admin]} },
  { path: 'admin/classes', component: ManageClassesComponent, canActivate: [AuthGuard], data: {roles: [Role.admin]} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
