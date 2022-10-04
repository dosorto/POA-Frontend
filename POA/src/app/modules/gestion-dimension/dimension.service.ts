import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { DimensionModels } from "./dimension.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DimensionService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _dimensiones: Array<DimensionModels.dimension> = [];
  get dimensiones() {
    return this._dimensiones;
  }
  public crearDimension (nombre:string,descripcion:string,idPei:number):any{
      const url = environment.servidor + 'dimension/create';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         descripcion: descripcion,
         idPei:idPei
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


  getdimensiones() {
    return this.callHttp.httpGet<Array<DimensionModels.dimension>>(`${environment.servidor}dimension/get_all`)
      .pipe(map(response => {
        this._dimensiones = response;
        return response;
      }))
  }
  eliminarDimension(nombre: string) {
    const url = environment.servidor + 'dimension/delete';

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
    this.directHttp.put(url,{nombre:nombre}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  // alternativa a update
  updateDimension(nombre: string, descripcion:string, id:number):any {
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
  }

}