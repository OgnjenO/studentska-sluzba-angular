import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { ManageUsersComponent } from './pages/admin/manage/users/users.component';
import { ManageSubjectsComponent } from './pages/admin/manage/subjects/subjects.component';
import { SubjectSignupComponent } from './pages/user/subjects/signup/signup.component';
import { RegisterSubjectComponent } from './pages/user/subjects/exam/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', redirectTo: 'admin/users', pathMatch: 'full' },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AuthGuard], data: {roles: [Role.admin]} },
  { path: 'admin/subjects', component: ManageSubjectsComponent, canActivate: [AuthGuard], data: {roles: [Role.admin]} },
  { path: 'student', redirectTo: 'student/subjects', pathMatch: 'full' },
  { path: 'student/subjects', redirectTo: 'student/subjects/signup', pathMatch: 'full' },
  { path: 'student/subjects/signup', component: SubjectSignupComponent, canActivate: [AuthGuard], data: {roles: [Role.student]} },
  { path: 'student/subjects/exam/register', component: RegisterSubjectComponent, canActivate: [AuthGuard], data: {roles: [Role.student]} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
