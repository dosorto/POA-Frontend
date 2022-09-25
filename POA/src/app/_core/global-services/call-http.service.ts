import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallHttpService {

  constructor(private http: HttpClient) { }

  httpGet<T>(url:string, param?:string):Observable<T>{
    let urlGet = (param == null) ? url : url + "?" + param;

    var response = this.http.get<T>(urlGet)
      .pipe(catchError(this.handleError()));

      return response;
  }

  httpPost<T>(url: string, contentBody: any = {}): Observable<T> {    
    var response = this.http.post<T>(url, contentBody)
        .pipe(catchError(this.handleError()));
    return response;
  }

  httpPut<T>(url: string, contentBody: any = {}): Observable<T> {    
    var response = this.http.put<T>(url, contentBody)
        .pipe(catchError(this.handleError()));
    return response;
  }

  httpDelete<T>(url:string):Observable<T>{
    var response = this.http.delete<T>(url)
      .pipe(catchError(this.handleError()));

      return response;
  }

  private handleError<T = any>() {
    return (error: HttpErrorResponse): Observable<T> => {
      

      if(error.error.hasError){
       
      }

      if(error.status == 401){  
        /**
         * Error 401 es cuando el usuario no esta autenticado al backend
         */
      }

      if(error.status == 422){
        let mensaje = '';

        /**
         * obtener error, por lo general el 422 viene del validor del backend
         *  aqui se revisa segun el formato, que definan con su backend
         */

        throw new Error(mensaje); 
      }

      console.log(error);

      throw new Error(`Invalid`); //throwError('')
    }
  }
}
