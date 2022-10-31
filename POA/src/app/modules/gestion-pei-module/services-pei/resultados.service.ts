import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Objetivo } from '../interfaces-pei/objetivo.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
//import { Pei } from '../interfaces-pei/pei.model';
import { map, Observable, tap } from "rxjs";
//import { Dimension } from "../interfaces-pei/dimension.model";
//import { Area } from '../interfaces-pei/area.model';
import { environment } from "src/environments/environment";
import { Objetivos, Resultado, Area, Dimension, Pei } from '../interfaces-pei/resultado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  private _peis: Array<Pei> = [];
  get pei() {
    return this._peis;
  }

  private _dimensiones: Array<Dimension> = [];
  get dimensiones() {
    return this._dimensiones;
  }

  private _objetivos: Array<Objetivos> = [];
  get objetivos() {
    return this._objetivos;
  }

  private _areas: Array<Area> = [];
  get areas() {
    return this._areas;
  }

  private _resultado: Array<Resultado> = [];
  get resultados() {
    return this._resultado;
  }

  constructor(private http:HttpClient, private callHttp:CallHttpService, private directHttp: HttpClient) { }

  getResultado2()  {
    return this.callHttp.httpGet<Array<Resultado>>(`${environment.servidor}resultados/get-all`)
      .pipe(map(response => {
        this._resultado = response;
        return response;
      }))
  }
  
 

  getResultado(id: number): Observable<Resultado | undefined> {
    return this.getResultado2()
      .pipe(
        map((resultado: Resultado[]) => resultado.find(p => p.id === id))
      );
  }

  getResultados(): Observable<Resultado[]>{

    return this.http.get<Resultado[]>(environment.servidor + `resultados/get-all`)
  }
  // getResultadoId(id: number): Observable<Resultado | undefined> {
  //   return this.getResultados()
  //     .pipe(
  //       map((resultado: Resultado[]) => resultado.find(p => p.id === id))
  //     );
  // }

  getAreas()  {
    return this.callHttp.httpGet<Array<Area>>(environment.servidor + `area/get_All`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }
  //Funcion para obtener las areas
  getArea(){
    const url = environment.servidor + `area/get_All`;
    return this.http.get(url);
  }

  mostrar_resultados_id(id: string): Observable<any> {
    const url = environment.servidor + `resultados/getResultado/:id`;
    return this.http.get(url + id);
  }
  mostrar_resultados_idResultado(id: string): Observable<any> {
    const url = environment.servidor + `resultados/getResultado/:id`;
    return this.http.get(url + id);
  }
  mostrar_resultado_id(id: string): Observable<any> {
    const url = environment.servidor + `area/get/:id`;
    return this.http.get(url + id);
  }

  mostrar_Allresultado_idArea(id: Number): Observable<any> {
    const url = environment.servidor + `resultados/getResultado_by_idArea/`;
    return this.http.get(url + id);
  }

  eliminarResultado(id: any) {
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
    this.directHttp.get(url+id).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  

  //Función para crear un resultado
  public crearResultado (nombre:string, descripcion:string, idArea:number):any{
    const url = environment.servidor + 'resultados/crear';
  
    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       descripcion:descripcion,
       idArea:idArea,

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
  


}
