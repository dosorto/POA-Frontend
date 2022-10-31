import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Objetivo } from '../interfaces-pei/objetivo.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Pei } from '../interfaces-pei/pei.model';
import { map, Observable } from "rxjs";
import { Dimension } from "../interfaces-pei/dimension.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
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
  

  constructor(private http: HttpClient, private callHttp: CallHttpService, private directHttp: HttpClient) { 
    // console.log('Servicio HTTP:')
  }

  
  getObjetivos()  {
    return this.callHttp.httpGet<Array<Objetivo>>(`http://localhost:8080/objetivos/get_all`)
      .pipe(map(response => {
        this._objetivos = response;
        return response;
      }))
  }
  // getObjetivo(id: number)  {
  //   console.log("este es el id de servicio",id)
  //   return this.callHttp.httpGet<Array<Objetivo>>(`http://localhost:8080/objetivos/get_all_by_id/`+id)
  //     .pipe(map(response => this.objetivos.find(p => p.id === id)))
  //     }
////aqui llamas la variable de la url
      getObjetivo(id: number): Observable<Objetivo | undefined> {
        return this.getObjetivos()
          .pipe(
            map((objetivo: Objetivo[]) => objetivo.find(p => p.id === id))
          );
      }
  

  getPEI() {
    const url = `http://localhost:8080/PEI/get_PEI`;
    return this.http.get(url);
  }
  getdimensiones() {
    const url = `http://localhost:8080/dimension/get_all`;
    return this.http.get(url);
  }
 
  mostrar_objetivos_id(id: string): Observable<any> {
    const url = `http://localhost:8080/objetivos/objetivos/get_all_by_id/`;
    return this.http.get(url + id);
  }
  mostrar_objetivos_idObjetivo(id: string): Observable<any> {
    const url = `http://localhost:8080/objetivos/get_all_by_id/`;
    return this.http.get(url + id);
  }
  mostrar_objetivo_id(id: string): Observable<any> {
    const url = `http://localhost:8080/objetivos/get_all_by_Dimension/`;
    return this.http.get(url + id);
  }
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

  
// crear objetivos
public crearObjetivo (nombre:string,descripcion:string,idDimension:number):any{
  const url = environment.servidor + 'objetivos/crear';

  const params = new HttpParams({
   fromObject: {
     grant_type: 'password',
     nombre: nombre,
     descripcion:descripcion,
     idDimension:idDimension
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

//



  updateObjetivo(nombre: string,id:Number,descripcion:string):any {
    const url = environment.servidor + 'objetivos/actualizar';

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
    this.directHttp.put(url,{nombre:nombre,id:id,descripcion:descripcion}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  
}
