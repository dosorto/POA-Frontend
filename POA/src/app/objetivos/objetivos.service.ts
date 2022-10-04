import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { objetivo } from './objetivos.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  
  url="http://localhost:8080/objetivos/"
  constructor(private http: HttpClient, private callHttp: CallHttpService, private directHttp: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  getObjetivos(): Observable<any> {
    return this.http.get("http://localhost:8080/objetivos/get_all");
  }
 
  // eliminarObjetivo(id: string): Observable<any> {
  //   return this.http.get("http://localhost:8080/objetivos/eliminar/"+id);
  // }
  eliminarObjetivo(id: any) {
    const url = "http://localhost:8080/objetivos/eliminar/";

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
    this.directHttp.get(url+id).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  

  // insertarObjetivo(objetivos: Objetivo): Observable<any>{
  //   return this.http.post("http://localhost:8080/objetivos/crear",objetivos);
  // }

  postObjetivo(form:objetivo){
    return this.http.post("http://localhost:8080/objetivos/crear", form);

  }

  
}

