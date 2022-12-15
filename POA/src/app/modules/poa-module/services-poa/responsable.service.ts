import { Injectable } from '@angular/core';
import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { environment } from "../../../../environments/environment";
import { Poa } from "../../poa-module/interfaces-poa/poa.model";
import { Depto } from "../../poa-module/interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../poa-module/interfaces-poa/unidad_ejecutora.model";
import { Institucion } from "../../administracion-module/interfaces/institucion.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }

  public getEncargados(idActividad:number) :any {
    const url = environment.servidor + 'get_encargados_de_actividad/'+idActividad.toString();
    return this.directHttp.get(url); 
  }
  public delete(id:number):any{
    const url = environment.servidor + 'actividadEncargado/eliminar/'+id.toString();
    return this.directHttp.get(url);
}
}
