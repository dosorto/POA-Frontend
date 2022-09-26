import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { empleado } from '../models/user.interface';
import { usuario } from '../models/userDatos.interface'
import { ResponseI } from '../models/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

/*
  getUserById(){
    return this.http.get(environment.servidor);
  }
*/

  //Método para conectar con la base de datos y obtener los empleados
  getEmpleado(){
    return this.http.get<empleado[]>('http://localhost:8080/empleado/allEmpleados');
  }

/*
  createUser(equipo:Equipo)
  {
    return this.http.post(this.url, equipo);
  }

*/

  postUsuario(form:usuario){
    const url = environment.servidor2
    return this.http.post(url, form);

  }

  
}
