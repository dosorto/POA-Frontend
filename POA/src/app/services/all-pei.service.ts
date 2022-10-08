import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PEI } from '../models/pei';

@Injectable({
  providedIn: 'root'
})
export class AllPEIService {

  constructor(private http: HttpClient) {
    console.log('Servicio HTTP:')
   }

  //Servicio para obtener todos los PEI
  getPEI(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/auth/get_PEI/');
  }
}
