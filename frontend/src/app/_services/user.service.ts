import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';
const USER_API_URL = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API_URL + 'getCurrentUser');
  }

  updateSelf(data): Observable<any> {
    console.log('Update self data : ', data);
    return this.http.post(USER_API_URL + 'updateSelf', {
      id: data.id,
      email: data.email,
      password: data.password,
      subject: data.subject
    }, httpOptions);
  }

  registerExam(data): Observable<any> {
    console.log('Registering exam data : ', data);
    return this.http.post(USER_API_URL + 'registerExam', {
      userid: data.userid,
      subjectid: data.subjectid,
    }, httpOptions);
  }

  getSelfGrades(id): Observable<any> {
    return this.http.post(USER_API_URL + 'getSelfGrades', {
      id: id
    }, httpOptions);
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
