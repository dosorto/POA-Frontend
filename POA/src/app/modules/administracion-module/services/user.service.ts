import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/user.model';
import { Role } from '../interfaces/role.model';
import { Empleado } from '../interfaces/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _usuarios: Array<Usuario> = [];

  get usuarios() {
    return this._usuarios;
  }
  public newUser (_email:string,_username:string,_password:string,_password2:string,_idEmpleado:number,_idRol:number):any{
      const url = environment.servidor + 'auth/create-user';
 
      const params = new HttpParams({
       fromObject: {
        grant_type: 'password',
        email:_email,
        username : _username,
        password : _password,
        password2 : _password2,
        idEmpleado: _idEmpleado,
        idRol : _idRol
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
  actualizarDimension(nombre: string, descripcion:string, id:string):any {
    const url = environment.servidor + 'dimension/update';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
        descripcion:descripcion
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  getUsers() {
    return this.callHttp.httpGet<Array<Usuario>>(`${environment.servidor}auth/get-all`);
  }
  getRoles(){
    return this.callHttp.httpGet<Array<Role>>(`${environment.servidor}rol/get_roles`);
  }
  getEmpleados(){
    return this.callHttp.httpGet<Array<Empleado>>(`${environment.servidor}empleado/allEmpleados`);
  }

   deleteUser(id: number):any  {
    const url = environment.servidor + 'auth/delete-user/' + id;

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        id: id
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    return  this.directHttp.get(url);
  }

  // alternativa a update
   updateDimension(nombre: string, descripcion:string, id:number, idPei:number):any {
    const url = environment.servidor + 'dimension/update';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
        descripcion:descripcion
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id,idPei:idPei})
  }
}
