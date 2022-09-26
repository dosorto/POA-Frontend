import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) 
  {
    console.log('Servicio HTTP:');
   }
   
   getRol():any{
    return this.http.get('http://localhost:8080/rol/allrol');

   }
}
