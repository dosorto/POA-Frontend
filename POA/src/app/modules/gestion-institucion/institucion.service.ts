import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { InstitucionModels } from "./institucion.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class InstitucionService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _instituciones: Array<InstitucionModels.Institucion> = [];
  get instituciones() {
    return this._instituciones;
  }
  public crearInstitucion (nombre:string,descripcion:string):any{
      const url = environment.servidor + 'institucion/create';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         descripcion: descripcion,
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
  actualizarInstitucion(nombre: string, descripcion:string, id:string) {
    const url = environment.servidor + 'institucion/update';

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


  getInstituciones() {
    return this.callHttp.httpGet<Array<InstitucionModels.Institucion>>(`${environment.servidor}institucion/get_all`)
      .pipe(map(response => {
        this._instituciones = response;
        return response;
      }))
  }
  eliminarInstitucion(nombre: string) {
    const url = environment.servidor + 'institucion/delete';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    return this.directHttp.put(url,{nombre:nombre})
  }

  // alternativa a update
  updateInstitucion(nombre: string, descripcion:string, id:number):any {
    const url = environment.servidor + 'institucion/update';

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