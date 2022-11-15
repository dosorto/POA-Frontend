import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private router: Router,
    private ForgotPasswordService:ForgotPasswordService,
    private local:Storage) { }

    ngOnInit(): void {
    }

    async ForgotP(username:string){
    await this.ForgotPasswordService.ForgotP(username).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Hemos enviado un codigo de verificacion a tu correo a tu correo electronico',
        showConfirmButton: false,
        timer: 5000
      })
      setTimeout(function() {
        window.location.reload();
      },5000);
      this.router.navigate(['/newPassword']);
    }, (error: any) => {
      console.log(error);
    });
  }

 

}

