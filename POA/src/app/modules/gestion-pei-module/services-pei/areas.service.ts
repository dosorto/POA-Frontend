import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Area }from "../interfaces-pei/area.model";
import { Pei } from "../interfaces-pei/pei.model";
import { Objetivo } from "../interfaces-pei/objetivo.model";
import { Dimension } from "../interfaces-pei/dimension.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _areas: Array<Area> = [];
  private _peiList: Array<Pei> = [];
  private _objetivoList: Array<Objetivo> = [];
  private _dimensionList: Array<Dimension> = [];

  get areas() {
    return this._areas;
  }
  get peis() {
    return this._peiList;
  }
  get objetivos() {
    return this._objetivoList;
  }
  get dimensiones() {
    return this._dimensionList;
  }
  public crearArea (nombre:string,idObjetivo:number):any{
      const url = environment.servidor + 'area/crear';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
         nombre: nombre,
         idObjetivos:idObjetivo
       }
       });
 
       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/x-www-form-urlencoded'
         })
       };
       return this.directHttp.post(url,params, httpOptions);
       //return CallHttpService.httpPost()
       
    
  }
  actualizarArea(nombre: string, id:string):any {
    const url = environment.servidor + 'area/editar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,id:id}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
  };


  /*getAreas() {
    return this.callHttp.httpGet<Array<Area>>(`${environment.servidor}area/get_All`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }*/
  getAreas(idObjetivo:number) {
    return this.callHttp.httpGet<Array<Area>>(`${environment.servidor}area/get_all_by_idObjetivo/` + idObjetivo.toString())
      .pipe(map(response => {
        this._areas = response;               
        return response;
      }))
  }

  getDimension(idDimension:number) {
    return this.callHttp.httpGet<Dimension>(`${environment.servidor}dimension/get/`+idDimension.toString());
  }
<<<<<<< HEAD
  
  getArea(idArea:number) {
    return this.callHttp.httpGet<Area>(`${environment.servidor}area/get/`+idArea.toString());
  }
  
=======

  getArea(idArea:number) {
    return this.callHttp.httpGet<Area>(`${environment.servidor}area/get/`+idArea.toString());
  }
    getPEI_Id(idPei:number) {
    return this.callHttp.httpGet<Pei>(`${environment.servidor}PEI/get/`+idPei.toString());
  }
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")

  getObjetivos() {
    return this.callHttp.httpGet<Array<Objetivo>>(`${environment.servidor}objetivos/get_all`)
      .pipe(map(response => {
        this._objetivoList = response;
        return response;
      }))
  } 
  getPeiList() {
    return this.callHttp.httpGet<Array<Pei>>(`${environment.servidor}PEI/get_PEI`)
      .pipe(map(response => {
        this._peiList = response;
        return response;
      }))
  }
  getDimensiones() {
    return this.callHttp.httpGet<Array<Dimension>>(`${environment.servidor}dimension/get_all`)
      .pipe(map(response => {
        this._dimensionList = response;
        return response;
      }))
  }

  


<<<<<<< HEAD
  eliminarArea(nombre: string) {
=======
  eliminarArea(id: number):any {
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
    const url = environment.servidor + 'area/eliminar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
<<<<<<< HEAD
        nombre: nombre
=======
        id: id
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
<<<<<<< HEAD
    this.directHttp.put(url,{nombre:nombre}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
=======
    return  this.directHttp.put(url,{id:id})
 
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
  }

  // alternativa a update
  updateArea(nombre:string, id:number,idObjetivo:number):any {
    const url = environment.servidor + 'area/editar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,  
<<<<<<< HEAD
         idObjetivo:idObjetivo
=======
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
        
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,id:id,idObjetivo:idObjetivo}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
    return this.directHttp.put(url, params, httpOptions);
  }

}