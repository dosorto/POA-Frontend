import { CallHttpService } from "../../../_core/global-services/call-http.service";
import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { Empleado } from "../interfaces-poa/empleados.model";
import { Actividad } from "../interfaces-poa/actividad.model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  constructor(private callHttp: CallHttpService, private directHttp: HttpClient) { }
  private _actividades: Array<Actividad> = [];
  private _empleadoList: Array<Empleado> = [];


  get empleado() {
    return this._empleadoList;
  }
 
  get actividades(){
    return this._actividades;
  }
  public crearActividad (nombre:string,descripcion:string,
    estado:string,tipoActividad:string, categoria:string,
    idResultado:number,responsables:string):any{
      const url = environment.servidor + 'actividad/crear';
 
      const params = new HttpParams({
       fromObject: {
         grant_type: 'password',
           nombre: nombre,
            descripcion:descripcion,
            estado: estado,
            tipoActividad: tipoActividad,
            categoria:categoria,
            idResultado:idResultado
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
 


  /*getAreas() {
    return this.callHttp.httpGet<Array<Area>>(`${environment.servidor}area/get_All`)
      .pipe(map(response => {
        this._areas = response;
        return response;
      }))
  }*/
  getActividades(idPoa:number) {
    return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}actividad/get_all_by_idPoa/` + idPoa.toString())
      .pipe(map(response => {
        this._actividades = response;               
        return response;
      }))
  }
  getActividadesss() {
    return this.callHttp.httpGet<Array<Actividad>>(`${environment.servidor}actividad/get_All` )
      .pipe(map(response => {
        this._actividades = response;               
        return response;
      }))
  }



  getActividad(idArea:number) {
    return this.callHttp.httpGet<Actividad>(`${environment.servidor}actividad/get/`+idArea.toString());
  }


  getEmpleados() {
    return this.callHttp.httpGet<Array<Empleado>>(`${environment.servidor}empleado/allEmpleados`)
      .pipe(map(response => {
        this._empleadoList = response;
        return response;
      }))
  } 


  


  eliminarActividad(id: number):any {
    const url = environment.servidor + 'actividad/eliminar';

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
    return  this.directHttp.put(url,{id:id})
 
  }

  // alternativa a update
  updateActividad(id:number,nombre:string, descripcion:string,
    estado:string,tipoActividad:string, categoria:string,idResultado:number):any {
    const url = environment.servidor + 'actividad/editar';

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        nombre: nombre,  
        descripcion:descripcion,
        estado: estado,
        tipoActividad: tipoActividad,
        categoria:categoria,
        
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    //return this.directHttp.put(url, params, httpOptions);
    this.directHttp.put(url,{nombre:nombre,descripcion:descripcion,estado:estado,
      tipoActividad:tipoActividad,categoria:categoria,id:id,idResultado:idResultado}).subscribe((response:any)=>
    {
      console.log(response);
      return response;
    })
    return this.directHttp.put(url, params, httpOptions);
  }

  getActividadess(id: number): Observable<Actividad | undefined> {
    return this.getActividadesss()
      .pipe(
        map((actividad: Actividad[]) => actividad.find(p => p.id === id))
      );
  }

}