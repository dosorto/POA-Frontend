import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { Indicador } from '../../gestion-pei-module/interfaces-pei/indicadores.model';
import { Actividad } from '../../poa-module/interfaces-poa/actividad.model';
import { map, Observable } from "rxjs";
import { Poa } from '../../poa-module/interfaces-poa/poa.model';
import { Tareas } from '../../poa-module/interfaces-poa/tareas.model';
import { environment } from "../../../../environments/environment";
import { UnidadEjecutora } from '../../poa-module/interfaces-poa/unidad_ejecutora.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesUEService {

  private _tareas: Array<Tareas> = [];
  private _actividades:Array<Actividad>=[];
  private _indicadores:Array<Indicador>=[];
  private _poaList: Array<Poa> = [];

  get tareas() {
    return this._tareas;
  }
  get indicadores() {
    return this._indicadores;
  }
  get actividades() {
    return this._actividades;
  }
  get poas() {
    return this._poaList
  }


  constructor( private callHttp: CallHttpService, private directHttp: HttpClient) { }

  getPoa_id_idUE(idUE:number,anio:string) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/get_all_depto_poa1/` +idUE.toString()+`/`+anio)
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getPoa(idUE:number) {
    return this.callHttp.httpGet<Array<Poa>>(`${environment.servidor}reportes/get_poas_UE/` + idUE.toString())
      .pipe(map(response => {
        this._poaList = response;               
        return response;
      }))
  }

  getFuente11(idUE:number,anio:string) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/fuente11A/` + idUE.toString()+`/`+anio)
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }
  
  getFuente12(idUE:number,anio:string) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/fuente12A/` + idUE.toString()+`/`+anio)
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }
  
  getFuente12B(idUE:number,anio:string) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/fuente11BA/` + idUE.toString()+`/`+anio)
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getUE(){
    return this.callHttp.httpGet<Array<UnidadEjecutora>>(`${environment.servidor}reportes/get_all_ue`);
    }


}
