import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const SUBJECT_API_URL = 'http://localhost:8080/api/admin/subject/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(SUBJECT_API_URL + 'getSubjects');
  }

  updateSubject(subject): Observable<any> {
    return this.http.post(SUBJECT_API_URL + 'updateSubject', {
      id: subject.id,
      name: subject.name
    }, httpOptions);
  }

  createSubject(subject): Observable<any> {
    return this.http.post(SUBJECT_API_URL + 'createSubject', {
      name: subject.name
    }, httpOptions);
  }

  deleteSubject(subject): Observable<any> {
    return this.http.post(SUBJECT_API_URL + 'deleteSubject', {
      id: subject.id,
    }, httpOptions);
  }
}
