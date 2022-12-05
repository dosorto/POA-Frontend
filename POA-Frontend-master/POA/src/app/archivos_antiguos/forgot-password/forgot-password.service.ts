import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(private http:HttpClient) { 

  }

  public ForgotP(username:string):any {
    const url = 'http://localhost:8080/auth/forgotPassword';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       username: username
     }
     });

     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded'
       })
     };
     return this.http.put(url,params, httpOptions);
     //return CallHttpService.httpPost()
     
  }
}
