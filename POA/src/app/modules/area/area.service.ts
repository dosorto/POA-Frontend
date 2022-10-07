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
  get areas() {
    return this._areas;
  }
  public crearArea (nombre:string,idObjetivo:number,idDimension:number,idPei:number):any{
      const url = environment.servidor + 'area/crear';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         idObjetivo:idObjetivo,
         idDimension:idDimension,
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
  actualizarArea(nombre: string, id:string):any {
    const url = environment.servidor + 'area/editar';

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
    this.directHttp.put(url,{nombre:nombre,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  getArea() {
    return this.callHttp.httpGet<Array<AreaModels.Area>>(`${environment.servidor}area/get_All`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }
  eliminarArea(nombre: string) {
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
  updateArea(nombre:string, id:number,idObjetivo:number,idDimension:number, idPei:number):any {
    const url = environment.servidor + 'area/editar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,  
         idObjetivo:idObjetivo,
        idDimension:idDimension,
        idPei:idPei
        
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,id:id,idObjetivo:idObjetivo,idDimension:idDimension,idPei:idPei}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
    return this.directHttp.put(url, params, httpOptions);
  }

}