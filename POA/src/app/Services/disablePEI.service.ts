import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PEI } from '../models/pei';

@Injectable({
  providedIn: 'root'
})
export class DisablePEIService {
  url1 = 'http://localhost:8080/get_PEI/';
  url2 = 'http://localhost:8080/auth/disablePEI/';

  constructor(private http: HttpClient) { }

  //Servicio para obtener todos los PEI
  getPEI(): Observable<PEI[]> {
    return this.http.get<PEI[]>(this.url1);
  }

  disablePEI(id: string): Observable<any>{
    return this.http.delete(this.url2 + id);
  }
}
