import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pei } from '../interfaces-pei/pei.model';
import { Dimension } from "../interfaces-pei/dimension.model";
import { Objetivo } from '../interfaces-pei/objetivo.model';
import { Area } from '../interfaces-pei/area.model';
import { Resultado } from '../interfaces-pei/resultado.model';
import { Indicador } from '../interfaces-pei/indicadores.model';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  private _peis: Array<Pei> = [];
  get pei() {
    return this._peis;
  }

  private _dimensiones: Array<Dimension> = [];
  get dimensiones() {
    return this._dimensiones;
  }

  private _objetivos: Array<Objetivo> = [];
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

  private _indicador: Array<Indicador> = [];
  get indicador() {
    return this._indicador;
  }

  constructor(private http:HttpClient,
              private callHttp:CallHttpService,     
              private directHttp: HttpClient) { }

              getIndicador2()  {
                return this.callHttp.httpGet<Array<Indicador>>(`${environment.servidor}indicadores/get-all`)
                  .pipe(map(response => {
                    this._indicador = response;
                    return response;
                  }))
              }

              getIndicadoress(id :number) {
                return this.callHttp.httpGet<Indicador>(`${environment.servidor}indicadores/getIndicador/`+id.toString());
              } 
      
              getIndicador(id: number): Observable<Indicador | undefined> {
                return this.getIndicador2()
                  .pipe(
                    map((indicador: Indicador[]) => indicador.find(p => p.id === id))
                  );
              }

              getIndicadores(): Observable<Indicador[]>{

                return this.http.get<Indicador[]>(environment.servidor + `indicadores/get-all`)
              }


              getResultados()  {
                return this.callHttp.httpGet<Array<Resultado>>(environment.servidor + `resultados/get-all`)
                  .pipe(map(response => {
                    this._resultado = response;
                    return response;
                  }))
              }

              //Funcion para obtener las areas
  getResultado(){
    const url = environment.servidor + `indicadores/get-all`;
    return this.http.get(url);
  }

  mostrar_indicadores_id(id: string): Observable<any> {
    const url = environment.servidor + `indicadores/getIndicador/:id`;
    return this.http.get(url + id);
  }

  mostrar_indicadores_idResultado(id: string): Observable<any> {
    const url = environment.servidor + `indicadores/getIndicador/:id`;
    return this.http.get(url + id);
  }

  mostrar_indicador_id(id: string): Observable<any> {
    const url = environment.servidor + `indicadores/get/:id`;
    return this.http.get(url + id);
  }

  mostrar_AllIndicadores_idResultado(id: Number): Observable<any> {
    const url = environment.servidor + `indicadores/getIndicador_by_idResultado/`;
    return this.http.get(url + id);
  }

  eliminarIndicador(id: any) {
    const url = environment.servidor + `indicadores/deleteIndicador/`;

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
  public crearIndicador (nombre:string, descripcion:string, idResultado:number):any{
    const url = environment.servidor + 'indicadores/crear/';
  
    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       descripcion:descripcion,
       idResultado:idResultado,

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

    actualizarIndicadores(nombre: string, descripcion:string, id:string):any {
      const url = environment.servidor + 'indicadores/updateIndicador';
  
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
   updateIndicador(nombre: string, descripcion:string, id:number, idResultado:number):any {
    const url = environment.servidor + 'indicadores/updateIndicador/';

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
    return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id,idResultado:idResultado})
  }
}
