import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  getUsers(): any {
    return this.http.get('http://localhost:8080/auth/get-all');
  }
  
  getIdUser(id:string){
    return this.http.get('http://localhost:8080/auth/get/'+id);
  }
  
}
