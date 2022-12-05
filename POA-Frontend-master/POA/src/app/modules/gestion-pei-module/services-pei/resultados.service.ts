import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Objetivo } from '../interfaces-pei/objetivo.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Pei } from '../interfaces-pei/pei.model';
import { map, Observable, tap } from "rxjs";
import { Dimension } from "../interfaces-pei/dimension.model";
import { Area } from '../interfaces-pei/area.model';
import { environment } from "src/environments/environment";
import { Resultado } from '../interfaces-pei/resultado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Institucion } from '../../administracion-module/interfaces/institucion.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {



  constructor(private http:HttpClient,
              private callHttp:CallHttpService,     
              private directHttp: HttpClient) { }

  private _peis: Array<Pei> = [];
  private _dimensiones: Array<Dimension> = [];
  private _objetivos: Array<Objetivo> = [];
  private _areas: Array<Area> = [];
  private _resultado: Array<Resultado> = [];


  get pei() {
    return this._peis;
  }
  
  get dimensiones() {
    return this._dimensiones;
  }
  
  get objetivos() {
    return this._objetivos;
  }

  get areas() {
    return this._areas;
  }

  get resultados() {
    return this._resultado;
  }

   //Función para crear un resultado
   public crearResultado (nombre:string, descripcion:string, idArea:number):any{
    const url = environment.servidor + 'resultados/crear';
  
    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       descripcion:descripcion,
       idArea:idArea

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


    getResultados(idArea:number) {
      return this.callHttp.httpGet<Array<Resultado>>(`${environment.servidor}resultados/getResultado_by_idArea/`+idArea.toString())
        .pipe(map(response => {
          this._resultado = response;
          return response;
        }))
    }

    getResultado(idArea:number) {
      return this.callHttp.httpGet<Array<Resultado>>(`${environment.servidor}resultados/getResult/`+idArea.toString())
        .pipe(map(response => {
          this._resultado = response;
          return response;
        }))
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

    updateResultado(nombre: string, descripcion:string, id:number, idArea:number):any {
      const url = environment.servidor + 'resultados/updateResultado/';
  
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
      return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id,idArea:idArea})
    }

    getInsti_Id(idInsti:number) {
      return this.callHttp.httpGet<Institucion>(`${environment.servidor}institucion/get/`+idInsti.toString());
    }

    getPei_Id(idPei:number){
      return this.callHttp.httpGet<Pei>(`${environment.servidor}PEI/get/`+idPei.toString());
    }

    getDimensio_Id(idDimension:number){
      return this.callHttp.httpGet<Dimension>(`${environment.servidor}dimension/get/`+idDimension.toString());
    }

    getObjetivo_Id(idObjetivo:number){
      return this.callHttp.httpGet<Objetivo>(`${environment.servidor}objetivos/getObjetivo/`+idObjetivo.toString());
    }

    getArea_Id(idArea:number){
      return this.callHttp.httpGet<Area>(`${environment.servidor}area/get/`+idArea.toString());
    }





  getResultado2()  {
    return this.callHttp.httpGet<Array<Resultado>>(`${environment.servidor}resultados/get-all`)
      .pipe(map(response => {
        this._resultado = response;
        return response;
      }))
  }

  
  
  getResultadoss(id :number) {
    return this.callHttp.httpGet<Resultado>(`${environment.servidor}resultados/getResultado/`+id.toString());
  } 

  getResultad(id: number): Observable<Resultado | undefined> {
    return this.getResultado2()
      .pipe(
        map((resultado: Resultado[]) => resultado.find(p => p.id === id))
      );
  }

  // getResultados(): Observable<Resultado[]>{

  //   return this.http.get<Resultado[]>(environment.servidor + `resultados/get-all`)
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

  

 
  

    actualizarResultado(nombre: string, descripcion:string, id:string):any {
      const url = environment.servidor + 'resultados/updateResultado';
  
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
    // alternativa a update
   

}
