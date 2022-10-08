import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { ResultadoModels } from "./resultado.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ResultadoService {
  constructor(private http:HttpClient, private callHttp:CallHttpService, private directHttp: HttpClient) { }
  
//Función para obtener los resultados
 getResultado(){
    const url = environment.servidor + `resultados/get-all`;
    return this.http.get(url);
  }
//Función para obtener las dimensiones
  getDimension(){
    const url = environment.servidor + `dimension/get_all`;
    return this.http.get(url);
  }
//Funcion para obtener las areas
  getArea(){
    const url = environment.servidor + `area/get_All`;
    return this.http.get(url);
  }
//Función para obtener los objetivos
  getObjetivo(){
    const url = environment.servidor + `objetivos/get_all`;
    return this.http.get(url);
  }
//Función para obtener los pei
  getPei(){
    const url = environment.servidor + `PEI/get_PEI`;
    return this.http.get(url);
  }
  
//Función para crear un resultado
  public crearResultado (nombre:string,idArea:number, idDimension:number,idObjetivos:number,idPei:number):any{
    const url = environment.servidor + 'resultados/newResultado';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       idArea:idArea,
       idDimension:idDimension,
       idObjetivos:idObjetivos,
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

//Función para eliminar un resultado
  eliminarObjetivo(id: any) {
    const url = environment.servidor + `resultados/deleteResultado/`;

    const params = new HttpParams({
      fromObject: {
        //grant_type: 'password',
        id: id
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    this.directHttp.put(url,{id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

//Función para actualizar un resultado
   updateResultado(nombre: string, id:number, idArea:number, idDimension:number, idObjetivos:number,idPei:number):any {
    const url = environment.servidor + 'resultados/updateResultado';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre:nombre
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    this.directHttp.put(url,{nombre:nombre, id:id, idArea:idArea, idDimension:idDimension, idObjetivos:idObjetivos, idPei:idPei}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

 




}