import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PEI } from '../models/pei';

@Injectable({
  providedIn: 'root'
})
export class DisablePEIService {
  url1 = 'http://localhost:8080/auth/get_PEI/';
  url2 = 'http://localhost:8080/auth/disablePEI/';

  constructor(private http: HttpClient) { }

  getPEI(): Observable<any> {
    return this.http.get(this.url1);
  }

  disablePEI(id: string): Observable<any>{
    return this.http.delete(this.url2 + id);
  }
}
