import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './changepassword.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  

    constructor(private route: ActivatedRoute,
      private router: Router,
      private ChangePasswordService:ChangePasswordService,
      private local:Storage) { }

      ngOnInit(): void {
      }

   async ChangeP(old_password:string,new_password:string,new_password_again:string){
    await this.ChangePasswordService.ChangeP(old_password,new_password,new_password_again).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Se  cambio su contraseña',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    }, (error: any) => {
      console.log(error);
    });
  


}
}