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
  public crearArea (nombre:string,idObjetivo:number,idDimension:number,idPEI:number):any{
      const url = environment.servidor + 'area/crear';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         idObjetivo:idObjetivo,
         idDimension:idDimension,
         idPEI:idPEI
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
  actualizarInstitucion(nombre: string,idObjetivo:number,idDimension:number, idPEI:number, id:number):any {
    const url = environment.servidor + 'institucion/update';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
        idObjetivo:idObjetivo,
        idDimension:idDimension,
        idPEI:idPEI
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,idObjetivo:idObjetivo,idDimension:idDimension,idPEI:idPEI,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  getInstituciones() {
    return this.callHttp.httpGet<Array<AreaModels.Area>>(`${environment.servidor}institucion/get_all`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }
  eliminarInstitucion(nombre: string) {
    const url = environment.servidor + 'area/eliminar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
       /* idObjetivo:idObjetivo,
        idDimension:idDimension,
        idPei:idPEI*/
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
  updateInstitucion(nombre: string, idObjetivo:idObjetivo,idDimension:idDimension,idPEI:idPEI, id:number):any {
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
    this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

}