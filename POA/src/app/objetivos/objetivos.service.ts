import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objetivo } from './objetivos.model';
@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  url="http://localhost:8080/objetivos/"
  constructor(private http: HttpClient) { 
    console.log('Servicio HTTP:')
  }

  getObjetivos(): Observable<any> {
    return this.http.get("http://localhost:8080/objetivos/get_all");
  }
 
  eliminarObjetivo(id: string): Observable<any> {
    return this.http.get("http://localhost:8080/objetivos/eliminar/"+id);
  }

  insertarObjetivo(objetivos: Objetivo): Observable<any>{
    return this.http.post("http://localhost:8080/objetivos/crear",objetivos);
  }

  
}

