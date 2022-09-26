import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http:HttpClient) {}

  getRol(): any{
    return this.http.get('http://localhost:8080/rol/get/all-role');
  }
}