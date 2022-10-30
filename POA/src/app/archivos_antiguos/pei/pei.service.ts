import { CallHttpService } from "src/app/_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { peiModel } from "./pei.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Injectable({
  providedIn: 'root'
})

export class peiService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient, private Storage: Storage) { }
  private _peis: Array<peiModel.Pei> = [];
  private user = this.Storage.get_storage("user");
  private token = this.user.token;
  get pei() {
    return this._peis;
  }
  public crearPEI(name: string, initialYear: string, finalYear: string): any {
    const url = environment.servidor + 'PEI/new_PEI';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name,
        initialYear,
        finalYear,
        token: this.token
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.post(url, params, httpOptions);
    //return CallHttpService.httpPost()

  }
  actualizarPEI(name: string, initialYear: string, finalYear: string, id: number): any {
    const url = environment.servidor + 'PEI/updatePEI';
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name,
        initialYear,
        finalYear,
        token: this.token
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url, { name: name, initialYear: initialYear, finalYear: finalYear, id: id }).subscribe((response: any) => {
      console.log(response);
      return response;
    })
  };


  getPEI() {
    return this.callHttp.httpGet<Array<peiModel.Pei>>(environment.servidor + 'PEI/get_PEI')
      .pipe(map(response => {
        this._peis = response;
        return response;
      }))
  }
  eliminarPEI(name: string): any {
    const url = environment.servidor + 'PEI/disablePEI';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name: name
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    return this.directHttp.put(url, { name: name })
  }

  // alternativa a update
  updatePEI(name: string, initialYear: string, finalYear: string, id: number): any {
    const url = environment.servidor + 'PEI/updatePEI';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        name,
        initialYear,
        finalYear,
        token: this.token
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.directHttp.put(url, { name: name, initialYear: initialYear, finalYear: finalYear, id: id })

  }
}