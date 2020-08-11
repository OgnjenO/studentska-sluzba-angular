import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const USER_API_URL = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API_URL + 'getCurrentUser');
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user');
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod');
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin');
  }
}
