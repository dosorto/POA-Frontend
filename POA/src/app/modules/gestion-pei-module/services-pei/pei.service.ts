import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Pei } from "../interfaces-pei/pei.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
//import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Institucion } from '../../administracion-module/interfaces/institucion.model';

@Injectable({
  providedIn: 'root'
})

export class PeiService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _peis: Array<Pei> = [];

  get pei() {
    return this._peis;
  }

  public crearPEI(name: string, initialYear: string, finalYear: string,idInstitucion: number): any {
    const url = environment.servidor + 'PEI/new_PEI';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
        initialYear: initialYear,
        finalYear: finalYear,
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


  actualizarPEI(name: string, initialYear: string, finalYear: string, id: number, idInstitucion: number): any {
    const url = environment.servidor + 'PEI/updatePEI';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name,
        initialYear: initialYear,
        finalYear: finalYear,
        idInstitucion: idInstitucion
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url, { name: name, initialYear: initialYear, finalYear: finalYear, id: id, idInstitucion: idInstitucion }).subscribe((response: any) => {
      console.log(response);
      return response;
    })
  };


  getPEI() {
    return this.callHttp.httpGet<Array<Pei>>(`${environment.servidor}PEI/get_PEI`)
      .pipe(map(response => {
        this._peis = response;
        return response;
      }))
  }

  getPEI_Id(idPei:number) {
    return this.callHttp.httpGet<Pei>(`${environment.servidor}PEI/get/`+idPei.toString());
  }

  mostrar_insti_id(idInsti: number){
    return this.callHttp.httpGet<Pei>(`${environment.servidor}/PEI/peiById/`+idInsti.toString());
  }

  getInstituciones(){
    return this.callHttp.httpGet(`${environment.servidor}/institucion/get_all`)
  }

  MostrarPei(idInsti:number){
    return this.callHttp.httpGet<Array<Pei>>(`${environment.servidor}PEI/peiById/` + idInsti.toString())
      .pipe(map(response => {
        this._peis = response;
        return response;
      }))
  }
  getInstituciones(){
    return this.callHttp.httpGet<Array<Institucion>>(`${environment.servidor}institucion/get_all`)
      .pipe(map(response => {
        return response;
      }))
  }

  eliminarPEI(id: number): any {
    const url = environment.servidor + 'PEI/disablePEI';

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
    return this.directHttp.put(url, { id: id})
  }

  //alternativa a update
  updatePEI(name: string, initialYear: string, finalYear: string, id: number,idInstitucion:number): any {
    const url = environment.servidor + 'PEI/updatePEI';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name,
        initialYear,
        finalYear
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.put(url, { name: name, initialYear: initialYear, finalYear: finalYear, id: id,idInstitucion: idInstitucion})

  }
}
