import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './pages/board-admin/board-admin.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AdminMainComponent } from './pages/admin/main/main.component';
import { ManageUsersComponent } from './pages/admin/manage/users/users.component';
import { ManageClassesComponent } from './pages/admin/manage/classes/classes.component';
import { ClassSignupComponent } from './pages/user/classes/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    ProfileComponent,
    AdminMainComponent,
    ManageUsersComponent,
    ManageClassesComponent,
    ClassSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
