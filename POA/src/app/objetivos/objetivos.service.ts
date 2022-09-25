import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {

  constructor(private http: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  getObjetivos(): any {
    return this.http.get('http://localhost:8080/objetivos/get_all');
  }
  

  
}

