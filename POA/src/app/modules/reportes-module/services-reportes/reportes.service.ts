import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallHttpService } from 'src/app/_core/global-services/call-http.service';
import { environment } from "../../../../environments/environment";
import { Tareas }from '../../../../app/modules/poa-module/interfaces-poa/tareas.model';
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private _tareas: Array<Tareas> = [];
  get tareas() {
    return this._tareas;
  }
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  getPoa_id_iddepto(idPoa:number,idDepto:number) {
    return this.callHttp.httpGet<Array<Tareas>>(`${environment.servidor}reportes/get_all_depto_poa/` +idDepto.toString()+`/`+idPoa.toString())
      .pipe(map(response => {
        this._tareas = response;
        return response;
      }))
  }
}
