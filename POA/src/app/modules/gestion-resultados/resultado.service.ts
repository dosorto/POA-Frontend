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
  
  private _resultado: Array<ResultadoModels.Resultado> = [];
  private _areaList: Array<ResultadoModels.area> = [];
  private _dimensionesList: Array<ResultadoModels.Dimension> = [];
  private _objetivoList: Array<ResultadoModels.objetivos> = [];
  private _peiList: Array<ResultadoModels.Pei> = [];


  
 getResultado(){
    const url = environment.servidor + `resultados/get-all`;
    return this.http.get(url);
  }

  getDimension(){
    const url = environment.servidor + `dimension/get_all`;
    return this.http.get(url);
  }

  getArea(){
    const url = environment.servidor + `area/get-all`;
    return this.http.get(url);
  }

  getObjetivo(){
    const url = environment.servidor + `objetivos/get_all`;
    return this.http.get(url);
  }

  getPei(){
    const url = environment.servidor + `PEI/get_PEI`;
    return this.http.get(url);
  }

  get resultado(){
    return this._resultado;
  }

  get area(){
    return this._areaList;
  }

  get dimension(){
    return this._dimensionesList;
  }

  get objetivo (){
    return this._objetivoList;
  }

  get peis(){
    return this._peiList;
  }
  
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

    /*getResultado() {
      return this.callHttp.httpGet<Array<ResultadoModels.Resultado>>(`http://localhost:8080/resultados/get-all`)
        .pipe(map(response => {
          this._resultado = response;
          return response;
        }))
    }
  
   getAreaList() {
      return this.callHttp.httpGet<Array<ResultadoModels.area>>(`${environment.servidor}areas/get-all`)
        .pipe(map(response => {
          this._areaList = response;
          return response;
        }))
    }
  
    getDimensionList() {
      return this.callHttp.httpGet<Array<ResultadoModels.Dimension>>(`${environment.servidor}dimension/get_all`)
        .pipe(map(response => {
          this._dimensionesList = response;
          return response;
        }))
    }
  
    getObjetivoList() {
      return this.callHttp.httpGet<Array<ResultadoModels.objetivos>>(`${environment.servidor}objetivos/get_all`)
        .pipe(map(response => {
          this._objetivoList = response;
          return response;
        }))
    }
  
    getPeiList() {
      return this.callHttp.httpGet<Array<ResultadoModels.Pei>>(`${environment.servidor}PEI/get_PEI`)
        .pipe(map(response => {
          this._peiList = response;
          return response;
        }))
    }

    */

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
    this.directHttp.put(url,{id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

   // alternativa a update
   updateResultado(nombre: string, id:number, idArea:number, idDimension:number, idObjetivo:number,idPei:number):any {
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
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre, id:id, idArea:idArea, idDimension:idDimension, idObjetivo:idObjetivo, idPei:idPei}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

 




}