import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContraseñaService {
 
  url='http//localhost:8080/auth/changePassword';
  constructor(private http: HttpClient) { 
    console.log('servicio http');
  }

  getContrasena()
  {
    return this.http.get(this.url);
  }
}
