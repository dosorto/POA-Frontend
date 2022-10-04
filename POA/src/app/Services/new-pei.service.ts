import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PEI } from '../models/pei';

@Injectable({
  providedIn: 'root'
})
export class PEIService {
  url = 'http://localhost:8080/auth/new_PEI/';

  constructor(private http: HttpClient) { }

  createPEI(pei: PEI): Observable<any>{
    return this.http.post(this.url,pei);
  }
}
