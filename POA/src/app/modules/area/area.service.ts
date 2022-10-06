import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { AreaModels } from "./area.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AreaService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _areas: Array<AreaModels.Area> = [];
  get area() {
    return this._areas;
  }
  public crearArea ( nombre: string, idObjetivo: number,idDimension: number, idPei: number):any{
      const url = environment.servidor + 'area/crear';
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         idObjetivo: idObjetivo,
         idDimension:idDimension,
         idPei: idPei
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
  actualizarAREA( nombre: string, idObjetivo: number,idDimension: number, idPei: number,id:string):any {
    const url = environment.servidor + 'area/editar';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
         idObjetivo: idObjetivo,
         idDimension:idDimension,
         idPei: idPei
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{    nombre: nombre, idObjetivo: idObjetivo, idDimension:idDimension, idPei: idPei,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  getAREA() {   
    return this.callHttp.httpGet<Array<AreaModels.Area>>(`http://localhost:8080/area/getArea`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }
  eliminarAREA(nombre: string) {
    const url = environment.servidor + 'area/eliminar';
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
  updateArea(id:string, nombre: string, idObjetivo: number,idDimension: number, idPei: number):any {
    const url = environment.servidor + 'PEI/updatePEI';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
        idObjetivo: idObjetivo,
        idDimension:idDimension,
        idPei: idPei
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{  nombre: nombre, idObjetivo: idObjetivo, idDimension:idDimension, idPei: idPei,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

}