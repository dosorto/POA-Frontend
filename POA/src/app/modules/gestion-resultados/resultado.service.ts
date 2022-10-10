import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { ResultadoModels } from "./resultado.model";
import { map, Observable } from "rxjs";
import { resultado } from "./resultado.interface";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ResultadoService {
  constructor(private http:HttpClient) { }
  
  getResultado(): any {
    const url = environment.servidor + `resultados/get-all`;
    return this.http.get(url);
  }

  postResultado(form:resultado){
    const url = environment.servidor + `resultados/newResultado`;
    return this.http.post(url,form);
  }

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
    //return this.directHttp.put(url, params, httpOptions);
    this.http.put(url,{id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }
}