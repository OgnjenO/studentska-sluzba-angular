import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const CLASS_API_URL = 'http://localhost:8080/api/admin/class/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get(CLASS_API_URL + 'getClasses');
  }

  updateClass(cls): Observable<any> {
    return this.http.post(CLASS_API_URL + 'updateClass', {
      id: cls.id,
      name: cls.name
    }, httpOptions);
  }

  createClass(cls): Observable<any> {
    return this.http.post(CLASS_API_URL + 'createClass', {
      name: cls.name
    }, httpOptions);
  }
}
