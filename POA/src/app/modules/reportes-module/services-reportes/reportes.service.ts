import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { environment } from "../../../../environments/environment";
import { Tareas }from '../../../../app/modules/poa-module/interfaces-poa/tareas.model';
import { map, Observable } from "rxjs";
import { Depto } from '../../poa-module/interfaces-poa/depto.model';
import { Poa } from '../../poa-module/interfaces-poa/poa.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private _tareas: Array<Tareas> = [];
  get tareas() {
    return this._tareas;
  }

  private _poaList: Array<Poa> = [];

  get poas() {
    return this._poaList
  }
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  getPoa_id_iddepto(idPoa:number,idDepto:number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/get_all_depto_poa/` +idDepto.toString()+`/`+idPoa.toString())
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

}





