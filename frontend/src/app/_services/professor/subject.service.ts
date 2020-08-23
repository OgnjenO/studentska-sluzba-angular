import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const PROFESSOR_SUBJECT_URL = 'http://localhost:8080/api/professor/subject/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getAllUngradedExams(id): Observable<any> {
    return this.http.post(PROFESSOR_SUBJECT_URL + 'getAllUngradedExams', {
      userid: id,
    }, httpOptions);
  }

  gradeExam(data): Observable<any> {
    console.log('gradeExam data : ', data);
    return this.http.post(PROFESSOR_SUBJECT_URL + 'gradeExam', {
      id: data.id,
      grade: data.grade
    }, httpOptions);
  }
}
