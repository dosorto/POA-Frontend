import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {
  constructor(private http:HttpClient) { 
  }

  public newP(newPassword: string,newPasswordAgain:string,resetToken:string):any {
    const url = 'http://localhost:8080/auth/newPassword';

    const params = new HttpParams({
     fromObject: {
       grant_type: 'password',
       newPassword: newPassword,
       newPasswordAgain:newPasswordAgain,
       resetToken: resetToken

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
