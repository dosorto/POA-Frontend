import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

//Metodo para obtener el usuario con el ID
getUserrole(username:string){
  const url = environment.servidor + 'auth/userrole/' + username;
  return this.http.get(url);
};
}



