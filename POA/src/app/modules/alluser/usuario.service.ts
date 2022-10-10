import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http:HttpClient, private callHttp:CallHttpService, private directHttp: HttpClient) { }

  //Función para obtener los resultados
 getUsuario(){
  const url = environment.servidor + `auth/get-all`;
  return this.http.get(url);
}
//Función para obtener las dimensiones
getEmpleado(){
  const url = environment.servidor + `empleado/allEmpleados`;
  return this.http.get(url);
}
//Funcion para obtener las areas
getRol(){
  const url = environment.servidor + `rol/get_roles`;
  return this.http.get(url);
}

//Metodo para obtener el usuario con el ID
public getUser(id:string){
  const url = environment.servidor + `auth/get/` + id;
  return this.http.get(url);
};
//Función para crear un resultado
public crearUsuario (email:string, username:string, password:string, password2:string, idEmpleado:number, idRol:number):any{
  const url = environment.servidor + 'auth/create-user';

  const params = new HttpParams({
   fromObject: {
     grant_type: 'password',
     email:email,
     username:username,
     password:password,
     password2:password2,
     idEmpleado:idEmpleado,
     idRol:idRol
   }
   });
   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  return this.directHttp.post(url,params, httpOptions);
  //return CallHttpService.httpPost()
  }

  public actualizarUsuario (id:number,email:string, username:string, idEmpleado:number, idRol:number):any{
    const url = environment.servidor + 'auth/update-user';
  
    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       id: id,
       email:email,
       username:username,
       idEmpleado:idEmpleado,
       idRol:idRol
     }
     });
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url,params, httpOptions);
    //return CallHttpService.httpPost()
    }

}
