import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { environment } from "../../../../environments/environment";
import { Tareas }from '../../../../app/modules/poa-module/interfaces-poa/tareas.model';
import { map, Observable } from "rxjs";
import { Depto } from '../../poa-module/interfaces-poa/depto.model';
import { Poa } from '../../poa-module/interfaces-poa/poa.model';
import { Actividad } from '../../poa-module/interfaces-poa/actividad.model';
import { Indicador } from '../../gestion-pei-module/interfaces-pei/indicadores.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private _tareas: Array<Tareas> = [];
  private _actividades:Array<Actividad>=[];
  private _indicadores:Array<Indicador>=[];
  get tareas() {
    return this._tareas;
  }
  get indicadores() {
    return this._indicadores;
  }
  get actividades() {
    return this._actividades;
  }


  private _poaList: Array<Poa> = [];

  get poas() {
    return this._poaList
  }
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  getPoa_id_iddepto(idPoa:number,idDepto:number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/get_all_depto_poa/` +idPoa.toString()+`/`+idDepto.toString())
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getPoa_id_iddeptoIndicador(idPoa:number,idDepto:number) {
    return this.callHttp.httpGet<Array<Indicador>>(`${environment.servidor}reportes/indicadores/` +idPoa.toString()+`/`+idDepto.toString())
      .pipe(map(response => {
        this._indicadores = response;
        return response;
      }))
  }

  getnoPTareas(idPoa:number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/nopresupuesto/`+idPoa.toString())
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getsiPTareas(idPoa:number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/presupuesto/`+idPoa.toString())
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getDepto(){
    return this.callHttp.httpGet<Array<Depto>>(`${environment.servidor}departamento/get_all`);
    }


    getPoa(idDepto:number) {
      return this.callHttp.httpGet<Array<Poa>>(`${environment.servidor}POA/poaByIdDepto/` + idDepto.toString())
        .pipe(map(response => {
          this._poaList = response;               
          return response;
        }))
    }

    getPoa_Id(idPoa:number) {
      return this.callHttp.httpGet<Poa>(`${environment.servidor}POA/get/`+ idPoa.toString());
    }

    getFuente11(idPoa:number) {
      return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/suma11/` + idPoa.toString())
        .pipe(map(response => {
          this._tareas = response;
          return response;
        }))
    }
    
    getFuente12(idPoa:number) {
      return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/suma12/` + idPoa.toString())
        .pipe(map(response => {
          this._tareas = response;
          return response;
        }))
    }
    
    getFuente12B(idPoa:number) {
      return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/suma12B/` + idPoa.toString())
        .pipe(map(response => {
          this._tareas = response;
          return response;
        }))
    }

    getActvidades_Formulacion(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/estado_Formulacio/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

    getActvidades_ReFormulacion(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/estado_ReFormulacion/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

    getActvidades_Revision(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/estado_Revision/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

    getActvidades_Aprobada(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/estado_Aprobada/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

    getActvidades_Rechazada(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/estado_Rechazada/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

    getActvidades(idPoa:number) {
      return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/actividades/` + idPoa.toString())
        .pipe(map(response => {
          this._actividades = response;
          return response;
        }))
    }

}





