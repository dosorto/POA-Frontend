import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Poa } from "../../poa-module/interfaces-poa/poa.model";
import { Depto } from "../../poa-module/interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../poa-module/interfaces-poa/unidad_ejecutora.model";
import { Institucion } from "../../administracion-module/interfaces/institucion.model";

import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PoaService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }

  private _poa: Array<Poa> = [];
  private _depto: Array<Depto> = [];
  private _unidadejecutora: Array<UnidadEjecutora> = [];
  private _institucion: Array<Institucion> = [];

  get poa() {
    return this._poa;
  }
  get depto() {
    return this._depto;
  }
  get unidadejecutora() {
    return this._unidadejecutora;
  }

  get institucion() {
    return this._institucion;
  }


  public crearPOA(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string, idDepto: number, idUE: number, idInstitucion: number): any {
    const url = environment.servidor + 'POA/new_POA';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
        anio: anio,
        fuente11: fuente11,
        fuente12: fuente12,
        fuente12B: fuente12B,
        idDepto: idDepto,
        idUE: idUE,
        idInstitucion: idInstitucion

      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.directHttp.post(url, params, httpOptions);

  }

  actualizarPOA(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string, id: number, isActive: boolean ,idDepto: number, idUE: number, idInsti: number): any {
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
    this.directHttp.put(url, { name: name, anio: anio, fuente11: fuente11, fuente12: fuente12, fuente12B: fuente12B, id: id,isActive: isActive, idDepto: idDepto, idUE: idUE, idInsti: idInsti }).subscribe((response: any) => {
      console.log(response);
      return response;
    })
  };

  getPOA() {
    return this.callHttp.httpGet<Array<Poa>>(`${environment.servidor}POA/get_POA`)
      .pipe(map(response => {
        this._poa = response;
        return response;
      }))
  }

  getPOA_Id(idPoa: number) {
    return this.callHttp.httpGet<Poa>(`${environment.servidor}POA/get/` + idPoa.toString());
  }

  MostrarPoa(idDepto: number) {
    return this.callHttp.httpGet<Array<Poa>>(`${environment.servidor}POA/poaByIdDepto/` + idDepto.toString())
      .pipe(map(response => {
        this._poa = response;
        return response;
      }))
  }

  getdepartamentos() {
    return this.callHttp.httpGet<Array<Depto>>(`${environment.servidor}departamento/get_all`)
      .pipe(map(response => {
        return response;
      }))
  }
  getDepto_Id(idDepto: number) {
    return this.callHttp.httpGet<Depto>(`${environment.servidor}departamento/get/` + idDepto.toString());
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

  //activar POA
  activarPOA(id: number): any {
    const url = environment.servidor + 'POA/activePOA';

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
  updatePOA(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string, id: number,isActive:boolean, idDepto: number, idUE: number, idInsti: number): any {
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
    return this.directHttp.put(url, { name: name, anio: anio, fuente11: fuente11, fuente12: fuente12, fuente12B: fuente12B, id: id,isActive, idDepto: idDepto, idUE: idUE, idInsti: idInsti })

  }


}
