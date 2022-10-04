import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { catchError, Observable } from 'rxjs';
//import {listUsuario} from '../Modelos/usuario.interface';
import { environment } from 'src/environments/environment';
//import { Handler } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private http:HttpClient) { 
  }

//Metodo para obtener el usuario con el ID
getUser(id:string){
  const url = environment.servidor + `auth/get_empleado/` + id;
  return this.http.get(url);
};
}

