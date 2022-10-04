import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = 'http://localhost:8080/peiArea/crear';
  constructor(private http: HttpClient) { }

  insertarArea(area: area): Observable<any>{
    return this.http.post(this.url,area);
  }
}