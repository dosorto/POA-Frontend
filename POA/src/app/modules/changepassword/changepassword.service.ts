import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(private http:HttpClient) { 

  }

  public ChangeP(id:number,old_password:string,new_password:string,new_password_again:string):any {
    const url = 'http://localhost:8080/auth/changePassword';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       id:id,
       old_password:old_password,
       new_password:new_password,
       new_password_again:new_password_again
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