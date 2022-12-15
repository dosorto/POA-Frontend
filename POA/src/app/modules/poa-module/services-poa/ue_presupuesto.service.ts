import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Poa } from "../../poa-module/interfaces-poa/poa.model";
import { Depto } from "../../poa-module/interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../poa-module/interfaces-poa/unidad_ejecutora.model";
import { Institucion } from "../../administracion-module/interfaces/institucion.model";
import { UePresupuestoModel } from "../interfaces-poa/ue_presupuesto.model";

import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UePresupuesto {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }


  public crearUePresupuesto(anio: string, fuente11: string, fuente12: string, fuente12B: string, idUE: number): any {
    const url = environment.servidor + 'ue_presupuesto/create';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        
        anio: anio,
        fuente11: fuente11,
        fuente12: fuente12,
        fuente12B: fuente12B,
        idUnidadEjecutora: idUE,

      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.directHttp.post(url, params, httpOptions);

  }

  actualizarPOA(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string, id: number, isActive: boolean, idDepto: number, idUE: number, idInsti: number): any {
    const url = environment.servidor + 'POA/updatePOA';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
        anio: anio,
        fuente11: fuente11,
        fuente12: fuente12,
        fuente12B: fuente12B,
        isActive: isActive,
        idDepto: idDepto,
        idUE: idUE,
        idInsti: idInsti
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url, { name: name, anio: anio, fuente11: fuente11, fuente12: fuente12, fuente12B: fuente12B, id: id, isActive: isActive, idDepto: idDepto, idUE: idUE, idInsti: idInsti }).subscribe((response: any) => {
      console.log(response);
      return response;
    })
  };



  getAllUePresupuestos(IdUe: number):any {
    return this.directHttp.get<Array<UePresupuestoModel>>(`${environment.servidor}ue_presupuesto/get_all/` + IdUe.toString());
  }

 

  getdepartamentos(){
    return this.directHttp.get<Array<Depto>>(`${environment.servidor}departamento/get_all`);
  }
  getPresupuestoforUE(idUE:number,anio:string){
    return this.directHttp.get(`${environment.servidor}ue_presupuesto/get_status/`+idUE+"/"+anio);
  }
  getrUE(idUE:number){
    return this.directHttp.get(`${environment.servidor}ue_presupuesto/get/`+idUE);
  }
  getStatusOfDepto(idDepto: number, idUE:number, anio:string) {
    const url = environment.servidor + 'ue_presupuesto/get_status_depto';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        idDepto: idDepto,
        idUnidadEjecutora: idUE,
        anio: anio
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url, params, httpOptions);

  }
  getInsti_Id(idInsti: number) {
    return this.callHttp.httpGet<Institucion>(`${environment.servidor}institucion/get/` + idInsti.toString());
  }

  eliminarPOA(id: number): any {
    const url = environment.servidor + 'POA/disablePOA';

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
    return this.directHttp.put(url, { id: id })
  }

  

  //alternativa a update
  updatePOA(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string, id: number, isActive: boolean, idInsti: number, idUE: number, idDepto: number): any {
    const url = environment.servidor + 'POA/updatePOA';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
        anio: anio,
        fuente11: fuente11,
        fuente12: fuente12,
        fuente12B: fuente12B,
        isActive: isActive,
        idInsti: idInsti,
        idDepto: idDepto,
        idUE: idUE
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.put(url, { name: name, anio: anio, fuente11: fuente11, fuente12: fuente12, fuente12B: fuente12B, id: id, isActive, idInsti: idInsti, idDepto: idDepto, idUE: idUE })

  }


}
