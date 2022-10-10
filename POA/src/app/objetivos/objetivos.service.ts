
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { objetivomodel } from './objetivos.model';
import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { peiModel } from '../modules/pei/pei.model';
import { map, Observable } from "rxjs";
import { DimensionModels } from '../modules/gestion-dimension/dimension.model';
import { environment } from "src/environments/environment";
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
    const url = `http://localhost:8080/PEI/get_PEI`;
    return this.http.get(url);
  }
  getdimensiones() {
      const url = `http://localhost:8080/dimension/get_all`;
    return this.http.get(url);
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
 
public crearObjetivo (nombre:string,idDimension:number,idPei:number):any{
  const url = environment.servidor + 'objetivos/crear';

  const params = new HttpParams({
   fromObject: {
     grant_type: 'password',
     nombre: nombre,
     idDimension:idDimension,
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

//


  postObjetivo(form:objetivomodel.objetivo){
    return this.http.post("http://localhost:8080/objetivos/crear", form);

  }

  updateObjetivo(nombre: string,id:Number,idDimension:Number,idPei:Number):any {
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
    this.directHttp.put(url,{nombre:nombre,id:id,idDimension:idDimension,idPei:idPei}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  }

  
}

