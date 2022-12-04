import { Injectable } from '@angular/core';
import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { environment } from "../../../../environments/environment";
import { Actividad } from '../interfaces-poa/actividad.model';
import { Indicadores } from '../interfaces-poa/Indicadores.model';
import { Institucion } from '../../administracion-module/interfaces/institucion.model';
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";
import { Poa } from '../interfaces-poa/poa.model';
import { Depto } from '../interfaces-poa/depto.model';


@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }

  private _indicadores: Array<Indicadores> = [];
  private _actividadList: Array<Actividad> = [];
  private _poaList: Array<Poa> = [];


  get indicadores() {
    return this._indicadores;
  }
  get actividades() {
    return this._actividadList
  }
  get poas() {
    return this._poaList
  }

  public crearIndicador (nombre:string,descripcion:string,cantidadPlanificada:number,isCantidad:boolean,isPorcentaje:boolean,idActividad:number):any{
    const url = environment.servidor + 'indicadoresPOA/crear';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       descripcion: descripcion,
       cantidadPlanificada: cantidadPlanificada,
       isCantidad: isCantidad,
       isPorcentaje: isPorcentaje,
       idActividad:idActividad
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


getIndicador(idActividad:number) {
  return this.callHttp.httpGet<Array<Indicadores>>(`${environment.servidor}indicadores/getIndicador_by_idActividad/` + idActividad.toString())
    .pipe(map(response => {
      this._indicadores = response;
      return response;
    }))
}


eliminarIndicador(idIndicador: number):any  {
  const url = environment.servidor + 'indicadoresPOA/deleteIndicadores/';

  const params = new HttpParams({
    fromObject: {
      //grant_type: 'password',
      idIndicador: idIndicador
    }
  });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  //return this.directHttp.put(url, params, httpOptions);
  this.directHttp.get(url+idIndicador).subscribe((response:any)=>
  {
    console.log(response);
    return response;
  })
}


updateIndicador(nombre: string, descripcion:string,  id:number,idActividad:number):any {
  const url = environment.servidor + 'indicadoresPOA/updateIndicadores/';

  const params = new HttpParams({
    fromObject: {
      grant_type: 'password',
      nombre: nombre,
      descripcion:descripcion,
    }
  });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  //return this.directHttp.put(url, params, httpOptions);
  return this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id,idActividad:idActividad})
}

seguimientoIndicador(cantidadPlanificada: number, cantidadEjecutada:number, promedioAlcanzado:number,  id:number, idActividad:number):any {
  const url = environment.servidor + 'indicadoresPOA/seguimiento/';

  const params = new HttpParams({
    fromObject: {
      grant_type: 'password',
      cantidadPlanificada: cantidadPlanificada,
      cantidadEjecutada: cantidadEjecutada,
      promedioAlcanzado: promedioAlcanzado
    }
  });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  //return this.directHttp.put(url, params, httpOptions);
  return this.directHttp.put(url,{cantidadPlanificada:cantidadPlanificada,cantidadEjecutada:cantidadEjecutada,promedioAlcanzado:promedioAlcanzado,id:id,idActividad:idActividad})
}





////////////////////////////////////////////////////
getInsti_Id(idInsti:number) {
  return this.callHttp.httpGet<Institucion>(`${environment.servidor}institucion/get/`+idInsti.toString());
}

getPoa_Id(idPoa:number) {
  return this.callHttp.httpGet<Poa>(`${environment.servidor}POA/get/`+ idPoa.toString());
}

getActividad_Id(idActividad:number) {
  return this.callHttp.httpGet<Actividad>(`${environment.servidor}actividad/get/`+ idActividad.toString());
}

getIndicador_Id(idIndicador:number) {
  return this.callHttp.httpGet<Indicadores>(`${environment.servidor}indicadoresPOA/get-Indicadores/`+idIndicador.toString());
}



getDepto_Id(idDepto:number) {
  return this.callHttp.httpGet<Depto>(`${environment.servidor}indicadoresPOA/get-Depto/`+ idDepto.toString());
}




getActividades(idPoa:number) {
  return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}actividad/get_all_by_idPoa/` + idPoa.toString())
    .pipe(map(response => {
      this._actividadList = response;               
      return response;
    }))
}
}
