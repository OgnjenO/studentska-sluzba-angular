import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AdminMainComponent } from './pages/admin/main/main.component';
import { ManageUsersComponent } from './pages/admin/manage/users/users.component';
import { ManageSubjectsComponent } from './pages/admin/manage/subjects/subjects.component';
import { SubjectSignupComponent } from './pages/user/subjects/signup/signup.component';
import { RegisterSubjectComponent } from './pages/user/subjects/exam/register/register.component';
import { SubjectListComponent } from './pages/professor/subjects/list/list.component';
import { GradeListComponent } from './pages/user/subjects/exam/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminMainComponent,
    ManageUsersComponent,
    ManageSubjectsComponent,
    SubjectSignupComponent,
    RegisterSubjectComponent,
    SubjectListComponent,
    GradeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
