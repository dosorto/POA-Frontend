import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private toast:ToastrService) { }

  showSuccess(texto:any,titulo:any){
    this.toast.success(texto,titulo);
  }

  showError(texto:any,titulo:any){
    this.toast.error(texto,titulo);
  }
}
