import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Institucion } from "../interfaces/institucion.model";
import { Pei } from "../../gestion-pei-module/interfaces-pei/pei.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from "src/app/_core/global-services/local_storage.service";
import { UnidadEjecutora } from "../../poa-module/interfaces-poa/unidad_ejecutora.model";

@Injectable({
  providedIn: 'root'
})

export class UeService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient, private Storage:Storage) { }
  private _ue: Array<UnidadEjecutora> = [];
  private user = this.Storage.get_storage("user");
  private token = this.user.token;
  get ue() {
    return this._ue;
  }
  public crearUe (nombre:string,descripcion:string,idInstitucion:number):any{
      const url = environment.servidor + 'unidad_ejecutora/create';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         descripcion: descripcion,
         idInstitucion:idInstitucion
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
  actualizarUe(nombre: string, descripcion:string, id:string) {
    const url = environment.servidor + '/unidad_ejecutora/update';

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


  getAllUE(idInstitucion:number) {
    return this.callHttp.httpGet<Array<UnidadEjecutora>>(`${environment.servidor}unidad_ejecutora/get_all/`+idInstitucion)
      .pipe(map(response => {
        this._ue = response;
        return response;
      }))
  }
  eliminarUe(id: number) {
    const url = environment.servidor + 'unidad_ejecutora/delete';

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
  updateUe(nombre: string, descripcion:string, id:number):any {
    const url = environment.servidor + 'unidad_ejecutora/update';

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