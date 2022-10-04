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
  private _peis: Array<AreaModels.Area> = [];
  get area() {
    return this._peis;
  }
  public crearArea ( nombre: string, idObjetivo: string,idDimension: string, idPEI: string):any{
      const url = environment.servidor + 'area/crear';
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         idObjetivo: idObjetivo,
         idDimension:idDimension,
         idPEI: idPEI
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
  actualizarAREA(id:number, name: string, idObjetivo: string,idDimension: string, idPEI: string):any {
    const url = environment.servidor + 'area/editar';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
         idObjetivo: idObjetivo,
         idDimension:idDimension,
         idPEI: idPEI
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.post(url,{    name: name, idObjetivo: idObjetivo, idDimension:idDimension, idPEI: idPEI,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  getAREA() {   
    return this.callHttp.httpGet<Array<AreaModels.Area>>(`http://localhost:8080/area/getArea`)
      .pipe(map(response => {
        this._peis = response;
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
    this.directHttp.post(url,{nombre:nombre}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  // alternativa a update
  updatePEI(nombre: string, descripcion:string, id:number):any {
    const url = environment.servidor + 'PEI/updatePEI';

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
    this.directHttp.put(url,{name:name,descripcion:descripcion,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

}