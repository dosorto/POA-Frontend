import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContraseñaService {

  url='http//localhost:8080/auth/changePassword';
  constructor(private http: HttpClient) { }
  
  //obtener una contrasena
  //duda 
  getContrasena(): Observable<any>{
    return this.http.get(this.url);
  }
  GuardarContrasena(old_password:string,new_password:string,new_password_again:string): Observable<any>{
    return this.http.put(this.url +  old_password,new_password,);
    //falta aca 
    
  

}

}


