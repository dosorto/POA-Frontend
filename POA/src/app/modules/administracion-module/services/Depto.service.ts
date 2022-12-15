import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Institucion } from "../interfaces/institucion.model";
import { Pei } from "../../gestion-pei-module/interfaces-pei/pei.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from "src/app/_core/global-services/local_storage.service";
import { Departamento } from '../interfaces/depto.model';

@Injectable({
  providedIn: 'root'
})

export class DeptoService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient, private Storage:Storage) { }
  private _depto: Array<Departamento> = [];
  private user = this.Storage.get_storage("user");
  private token = this.user.token;
  get depto() {
    return this._depto;
  }
  public crearDepto (nombre:string,descripcion:string,idUnidadEjecutora:number):any{
      const url = environment.servidor + 'depto/create';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         descripcion: descripcion,
         idUnidadEjecutora:idUnidadEjecutora
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
  actualizarDepto(nombre: string, descripcion:string, id:string) {
    const url = environment.servidor + 'depto/update';

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
   return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id});
  };


  getAllDeptos(idUnidadEjecutora:number) {
    return this.callHttp.httpGet<Array<Departamento>>(`${environment.servidor}depto/get_all/`+idUnidadEjecutora)
      .pipe(map(response => {
        this._depto = response;
        return response;
      }))
  }
  eliminarDepto(id: number) {
    const url = environment.servidor + 'depto/delete';

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
    return this.directHttp.put(url,{id:id})
  }

  // alternativa a update
  updateDepto(nombre: string, descripcion:string, id:number):any {
    const url = environment.servidor + 'depto/update';

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
    return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id})
  }


}