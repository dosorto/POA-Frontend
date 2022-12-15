import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";
import { Tareas } from "../../poa-module/interfaces-poa/tareas.model";
import { Actividad } from "../../poa-module/interfaces-poa/actividad.model";
import { Indicador } from "../../gestion-pei-module/interfaces-pei/indicadores.model";
import { Poa } from "../../poa-module/interfaces-poa/poa.model";
import { Depto } from "../../poa-module/interfaces-poa/depto.model";

@Injectable({
  providedIn: 'root'
})

export class RevisionService {
  private _tareas: Array<Tareas> = [];
  private _actividades: Array<Actividad> = [];
  private _indicadores: Array<Indicador> = [];
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
  getPoa_id_iddepto(idPoa: number, idDepto: number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/get_all_depto_poa/` + idPoa.toString() + `/` + idDepto.toString())
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }

  getPoa_id_iddeptoIndicador(idPoa: number, idDepto: number) {
    return this.callHttp.httpGet<Array<Indicador>>(`${environment.servidor}reportes/indicadores/` + idPoa.toString() + `/` + idDepto.toString())
      .pipe(map(response => {
        this._indicadores = response;
        return response;
      }))
  }

  getDepto() {
    return this.callHttp.httpGet<Array<Depto>>(`${environment.servidor}departamento/get_all`);
  }

  getPoa(idDepto: number) {
    return this.callHttp.httpGet<Array<Poa>>(`${environment.servidor}POA/poaByIdDepto/` + idDepto.toString())
      .pipe(map(response => {
        this._poaList = response;
        return response;
      }))
  }

  getPoa_Id(idPoa: number) {
    return this.callHttp.httpGet<Poa>(`${environment.servidor}POA/get/` + idPoa.toString());
  }

  getActvidades(idPoa:number) {
    return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}reportes/actividades/` + idPoa.toString())
      .pipe(map(response => {
        this._actividades = response;
        return response;
      }))
  }

  public crearRevision(nombre: string, nombre_aprobado: boolean, descripcion: string, descripcion_aprobado: boolean,
    cantidad: string, cantidad_aprobado: boolean, costoUnitario: string, costoUnitario_aprobado: boolean,
    objeto_grupo: string, objeto_grupo_aprobado: boolean, grupo_gasto: string, grupo_gasto_aprobado: boolean,
    unidad_medida: string, unidad_medida_aprobado: boolean, fuente: string, fuente_aprobado: boolean,
    idTarea: number): any {
    const url = environment.servidor + 'revision/create';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,
        nombre_aprobado: nombre_aprobado,

        descripcion: descripcion,
        descripcion_aprobado: descripcion_aprobado,

        cantidad: cantidad,
        cantidad_aprobado: cantidad_aprobado,

        costoUnitario: costoUnitario,
        costoUnitario_aprobado: costoUnitario_aprobado,

        objeto_grupo: objeto_grupo,
        objeto_grupo_aprobado: objeto_grupo_aprobado,

        grupo_gasto: grupo_gasto,
        grupo_gasto_aprobado: grupo_gasto_aprobado,

        unidad_medida: unidad_medida,
        unidad_medida_aprobado: unidad_medida_aprobado,

        fuente: fuente,
        fuente_aprobado: fuente_aprobado,

        idTarea: idTarea
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url, params, httpOptions);
    //return CallHttpService.httpPost()


  };
  public actualizarRevision(id: number, nombre: string, nombre_aprobado: boolean, descripcion: string, descripcion_aprobado: boolean,
    cantidad: string, cantidad_aprobado: boolean, costoUnitario: string, costoUnitario_aprobado: boolean,
    objeto_grupo: string, objeto_grupo_aprobado: boolean, grupo_gasto: string, grupo_gasto_aprobado: boolean,
    unidad_medida: string, unidad_medida_aprobado: boolean, fuente: string, fuente_aprobado: boolean,
    idTarea: number): any {
    const url = environment.servidor + 'revision/update';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        id: id,
        nombre: nombre,
        nombre_aprobado: nombre_aprobado,

        descripcion: descripcion,
        descripcion_aprobado: descripcion_aprobado,

        cantidad: cantidad,
        cantidad_aprobado: cantidad_aprobado,

        costoUnitario: costoUnitario,
        costoUnitario_aprobado: costoUnitario_aprobado,

        objeto_grupo: objeto_grupo,
        objeto_grupo_aprobado: objeto_grupo_aprobado,

        grupo_gasto: grupo_gasto,
        grupo_gasto_aprobado: grupo_gasto_aprobado,

        unidad_medida: unidad_medida,
        unidad_medida_aprobado: unidad_medida_aprobado,

        fuente: fuente,
        fuente_aprobado: fuente_aprobado,

        idTarea: idTarea
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url, params, httpOptions);
  };


  public getRevisionesByIdTarea(idTarea: number) {
    return this.callHttp.httpGet<Array<any>>(`${environment.servidor}revision/get_all/` + idTarea.toString());
  };

  public eliminarRevision(idTarea: number): any {
    const url = environment.servidor + 'revision/delete/' + idTarea.toString();

    //return this.directHttp.put(url, params, httpOptions);
    return this.directHttp.get(url);
  };



}