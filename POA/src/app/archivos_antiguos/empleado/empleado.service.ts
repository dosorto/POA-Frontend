import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  getEmpleado(): any {
    return this.http.get('http://localhost:8080/empleado/allEmpleados');
  }
}
