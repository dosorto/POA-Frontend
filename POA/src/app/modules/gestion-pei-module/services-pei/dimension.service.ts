import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Dimension } from "../interfaces-pei/dimension.model";
import { Pei } from "../interfaces-pei/pei.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";

@Injectable({
  providedIn: 'root'
})

export class DimensionService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _dimensiones: Array<Dimension> = [];
  private _peiList: Array<Pei> = [];

  get dimensiones() {
    return this._dimensiones;
  }
  get peis() {
    return this._peiList;
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


  getdimensiones(idPei:number) {
    return this.callHttp.httpGet<Array<Dimension>>(`${environment.servidor}dimension/get_all_by_id_pei/` + idPei.toString())
      .pipe(map(response => {
        this._dimensiones = response;
        return response;
      }))
  }
  getDimension(idDimension:number) {
    return this.callHttp.httpGet<Dimension>(`${environment.servidor}dimension/get/`+idDimension.toString());
  }

  getPeiList() {
    return this.callHttp.httpGet<Array<Pei>>(`${environment.servidor}PEI/get_PEI`)
      .pipe(map(response => {
        this._peiList = response;
        return response;
      }))
  }
  getPei(idPei:number) {
    return this.callHttp.httpGet<Pei>(`${environment.servidor}PEI/get_PEI`+idPei.toString())
      .pipe(map(response => {
        return response;
      }))
  }

   eliminarDimension(id: number):any  {
    const url = environment.servidor + 'dimension/delete';

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
    return  this.directHttp.put(url,{id:id})
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