import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_API_URL = 'http://localhost:8080/api/admin/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(USER_API_URL + 'getUsers');
  }

  getUser(userID): Observable<any> {
    return this.http.post(USER_API_URL + 'getUser', {
      id: userID
    }, httpOptions);
  }

  updateUser(user): Observable<any> {
    return this.http.post(USER_API_URL + 'updateUser', {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      grade: user.grade,
      password: user.password,
      role: user.role,
      classs: user.class
    }, httpOptions);
  }

  createUser(user): Observable<any> {
    return this.http.post(USER_API_URL + 'createUser', {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      grade: user.grade,
      password: user.password,
      role: user.role
    }, httpOptions);
  }

  deleteUser(userID): Observable<any> {
    return this.http.post(USER_API_URL + 'deleteUser', {
      id: userID,
    }, httpOptions);
  }
}
