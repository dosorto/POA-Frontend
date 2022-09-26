import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http:HttpClient) { 
  }

//Metodo para obtener el usuario con el ID
getUser(id:string){
  const url = environment.servidor + `auth/get/` + id;
  return this.http.get(url);
};

}


