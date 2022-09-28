import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallHttpService } from '../../_core/global-services/call-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }

  public signIn(username:string, password:string):any {
     const url = 'http://localhost:8080/auth/login';

     const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: username,
        password: password,
      }
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      return this.http.post(url,params, httpOptions);
      //return CallHttpService.httpPost()
      
   }
}
