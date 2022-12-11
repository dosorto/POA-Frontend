import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/user.model';
import { Role } from '../interfaces/role.model';
import { Empleado } from '../interfaces/empleado.model';
import { Permiso } from '../interfaces/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  getPermisos() {
    return this.callHttp.httpGet<Array<Permiso>>(`${environment.servidor}permiso/get_allPermiso`);
  }

  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _usuarios: Array<Usuario> = [];

  get usuarios() {
    return this._usuarios;
  }
  public newRol (_rol:string,_descripcion:string,_permisos:Array<number>):any{
      const url = environment.servidor + 'rol/create_rol';
      console.log(_permisos);
      const params = new HttpParams({
       fromObject: {
        grant_type: 'password',
        rol:_rol,
        descripcion : _descripcion,
        list_permisos:_permisos
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
  public getPermisosByIdRol (_idRol:number):any{
    const url = environment.servidor + 'rol/permisos_by_id_rol';
    const params = new HttpParams({
     fromObject: {
      grant_type: 'password',
      idRol:_idRol
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
  updateRol(id:number,_rol:string,_descripcion:string,_permisos:Array<number>):any {
    const url = environment.servidor + 'rol/update';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        id:id,
        rol:_rol,
        descripcion : _descripcion,
        list_permisos:_permisos
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url, params, httpOptions);
    //return this.directHttp.post(url,params);
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

   delete(id: number):any  {
    const url = environment.servidor + 'rol/delete/' + id;

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
}
