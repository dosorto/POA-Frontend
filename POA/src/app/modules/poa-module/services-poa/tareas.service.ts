import { Injectable } from '@angular/core';
import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { environment } from "../../../../environments/environment";
import { Actividad } from "../interfaces-poa/actividad.model"
import { Tareas } from '../interfaces-poa/tareas.model';
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { response } from "express";
import { Presupuesto } from '../interfaces-poa/presupuesto.model';
import { TareasH } from '../interfaces-poa/tareas_historico.model';
import { Poa } from '../interfaces-poa/poa.model';
import { Institucion } from '../../administracion-module/interfaces/institucion.model';
import { Indicadores } from '../interfaces-poa/Indicadores.model';
import { Depto } from '../interfaces-poa/depto.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _actividades: Array<Actividad> = [];
  private _tareas: Array<Tareas> = [];
  private _tareash: Array <TareasH>=[]
  private _presupuesto: Array<Presupuesto>=[]
  get actividades() {
    return this._actividades;
  }
  get tareas() {
    return this._tareas;
  }
  get presupuesto() {
    return this._presupuesto;
  }
  get tareash(){
    return this._tareash
  }

  public crearTarea (nombre:string,descripcion:string,isPresupuesto:boolean,idActividad:number,cantidad:number,costounitario:number,total:number,idobjeto:number,idfuente:number,idunidad:number):any{
    const url = environment.servidor + 'tarea/crear';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       nombre: nombre,
       descripcion: descripcion,
       isPresupuesto:isPresupuesto,
       idActividad:idActividad,
       cantidad:cantidad,
       costounitario:costounitario,
       total:total,
       idobjeto:idobjeto,
       idfuente:idfuente,
       idunidad:idunidad
     }
     });

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url,params, httpOptions);

}

actualizarTarea(nombre:string,descripcion:string,id:number,isPresupuesto:boolean,idActividad:number,cantidad:number,idP:number,costounitario:number,total:number,idobjeto:number,idfuente:number,idunidad:number):any {
  const url = environment.servidor + 'tarea/actualizar';

  const params = new HttpParams({
    fromObject: {
      grant_type: 'password',
      nombre: nombre,
       descripcion: descripcion,
       isPresupuesto:isPresupuesto,
       idActividad:idActividad,
       cantidad:cantidad,
       costounitario:costounitario,
       total:total,
       idobjeto:idobjeto,
       idfuente:idfuente,
       idunidad:idunidad
    }
    });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  //return this.directHttp.put(url, params, httpOptions);
  this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,id:id,isPresupuesto:isPresupuesto,idActividad:idActividad,cantidad:cantidad,costounitario:costounitario,idP:idP,total:total,idobjeto:idobjeto,idfuente:idfuente,idunidad:idunidad}).subscribe((response:any)=>
  {
    console.log(response);
    return response;
  })
};

// getTarea(idActividad:number) {
//   return this.callHttp.httpGet<Tareas>(`${environment.servidor}tarea/get_all_by_idActividad/`+idActividad.toString());
// }

getTarea(idActividad:number) {
  return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}tarea/get_all_by_idActividad/` + idActividad.toString())
    .pipe(map(response => {
      this._tareas = response;
      return response;
    }))
}

getTareaP(idActividad:number) {
  return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}tarea/get_all_presupuesto/` + idActividad.toString())
    .pipe(map(response => {
      this._tareas = response;
      return response;
    }))
}

Probando(nombre:string){
  return this.callHttp.httpGet<Array<Presupuesto>>(`${environment.servidor}tarea/prueba/` + nombre.toString())
    .pipe(map(response => {
      this._presupuesto = response;
      return response;
    }))
}

getPresupuesto(idtarea:number) {
  return this.callHttp.httpGet<Array<Presupuesto>>(`${environment.servidor}presupuesto/presupuesto_by_idtarea/` + idtarea.toString())
    .pipe(map(response => {
      this._presupuesto = response;
      return response;
    }))
}

getTareas(id:number) {
  return this.callHttp.httpGet<Tareas>(`${environment.servidor}tarea/get_all_by_id/`+id.toString());
}

getTareasH()  {
  return this.callHttp.httpGet<Array<TareasH>>(`http://localhost:8080/tareah/get_all`)
    .pipe(map(response => {
      this._tareash = response;
      return response;
    }))
  }

  eliminarTarea(id: any) {
    const url = "http://localhost:8080/tarea/eliminar/";
  
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

  getobjeto() {
    const url = `http://localhost:8080/objetogasto/get_all`;
    return this.directHttp.get(url);
  }

 


///////////////////////////////////////////////
////////////////////////////////////////////////////
// getFuente11(idPoa:number) {
//   return this.callHttp.httpGet<Institucion>(`${environment.servidor}tarea/suma/`+idPoa.toString());
// }

getFuente11(idActividad:number) {
  return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}tarea/suma/` + idActividad.toString())
    .pipe(map(response => {
      this._tareas = response;
      return response;
    }))
}

getFuente12(idActividad:number) {
  return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}tarea/suma_fuente12/` + idActividad.toString())
    .pipe(map(response => {
      this._tareas = response;
      return response;
    }))
}

getFuente12B(idActividad:number) {
  return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}tarea/suma_fuente12B/` + idActividad.toString())
    .pipe(map(response => {
      this._tareas = response;
      return response;
    }))
}

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
///Notss
// crear uno que una funcion que me liste todas las tareas con presupuestos y que sean distinct
}