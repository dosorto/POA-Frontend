import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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


  
}

