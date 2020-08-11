import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const GLOBAL_API_URL = 'http://localhost:8080/api/global/';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get(GLOBAL_API_URL + 'classes/getClasses');
  }
}
