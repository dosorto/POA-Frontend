import { Planificacion } from './../interfaces-poa/planificacion.model';
import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";

@Injectable({
  providedIn: 'root'
})

export class PlanificacionService {

  constructor(private callHttp:CallHttpService, private directHttp:HttpClient) { }

  // Para almacenar todas las planificaciones
  private _planificaciones: Array<Planificacion> = [];
  private planificacion: any = {};

  // Para retornar todas las planificaciones del array
  get planificaciones() {
    return this._planificaciones;
  }

  // consulta para crear una planificación
  public crearPlanificacion(trimestre:string, cantidad:number, fechaInicio:Date, fechaFin:Date): any {

      const url = environment.servidor + 'planificacion/create';

      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         trimestre:trimestre,
         cantidad: cantidad,
         fechaInicio:fechaInicio.toString(),
         fechaFin:fechaFin.toString(),
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


    // Para actualizar una planificacion
    actualizarPlanificacion(trimestre: string, cantidad: number, fechaInicio: Date,fechaFin: Date, id:number):any {
      const url = environment.servidor + 'planificacion/update';

      const params = new HttpParams({
        fromObject: {
          grant_type: 'password',
          id:id,
          trimestre: trimestre,
          cantidad:cantidad,
          fechaInicio:fechaInicio.toString(),
          fechaFin:fechaFin.toString()
        }
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      //return this.directHttp.put(url, params, httpOptions);
      return this.directHttp.put(url,{trimestre:trimestre, cantidad:cantidad, fechaInicio:fechaInicio, fechaFin:fechaFin, id:id})
    }

  // Obtener todas las planificaciones
  getPlanificaciones() {
    return this.callHttp.httpGet<Array<Planificacion>>(`${environment.servidor}planificacion/get_all`).pipe(map(response => {
        this._planificaciones = response;
        return response;
      }));
  }

  // Obtener una unica planificacion por el id
  getPlanificacion(idPlanificacion:number) {
    return this.callHttp.httpGet<Planificacion>(`${environment.servidor}planificacion/get/`+idPlanificacion.toString())
      .pipe(map(response => {
        return response;
      }))
  }

  // Eliminar una planificacion
   eliminarPlanificacion(id: number): any  {

    const url = environment.servidor + 'planificacion/delete';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        id: id
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    return  this.directHttp.put(url, {id:id})
  };

}
