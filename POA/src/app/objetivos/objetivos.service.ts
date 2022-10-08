
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { objetivomodel } from './objetivos.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { peiModel } from '../modules/pei/pei.model';
import { map, Observable } from "rxjs";
import { DimensionModels } from '../modules/gestion-dimension/dimension.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  private _peis: Array<peiModel.Pei> = [];
  get pei() {
    return this._peis;
  }

  private _dimensiones: Array<DimensionModels.dimension> = [];
  get dimensiones() {
    return this._dimensiones;
  }

  private _objetivos: Array<objetivomodel.objetivo> = [];
  get objetivos() {
    return this._objetivos;
  }
  

  constructor(private http: HttpClient, private callHttp: CallHttpService, private directHttp: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  
  getObjetivos()  {
    return this.callHttp.httpGet<Array<objetivomodel.objetivo>>(`http://localhost:8080/objetivos/get_all`)
      .pipe(map(response => {
        this._objetivos = response;
        return response;
      }))
  }
  getPEI() {
    return this.callHttp.httpGet<Array<peiModel.Pei>>(`http://localhost:8080/PEI/get_PEI`)
      .pipe(map(response => {
        this._peis = response;
        return response;
      }))
  }
  getdimensiones() {
    // return this.callHttp.httpGet<Array<DimensionModels.dimension>>(``)
    //   .pipe(map(response => {
    //     this._dimensiones = response;
    //     return response;
    //   }))
      const url = `http://localhost:8080/dimension/get_all`;
    return this.http.get(url);
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

  postObjetivo(form:objetivomodel.objetivo){
    return this.http.post("http://localhost:8080/objetivos/crear", form);

  }

  updateObjetivo(nombre: string, idDimension:Number,id:Number,idPei:Number):any {
    const url = "http://localhost:8080/objetivos/actualizar";

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
    this.directHttp.put(url,{nombre:nombre,idDimension:idDimension,id:id,idPei:idPei}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  
}

