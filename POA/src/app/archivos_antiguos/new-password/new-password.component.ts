import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPasswordService } from './new-password.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private NewPasswordService:NewPasswordService,
    private local:Storage) { }

    ngOnInit(): void {
    }

    async newP(newPassword: string,newPasswordAgain:string,resetToken:string){
    await this.NewPasswordService.newP(newPassword,newPasswordAgain,resetToken).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Contraseña restablecida con exito',
        showConfirmButton: false,
        timer: 5000
      })
      setTimeout(function() {
        window.location.reload();
      },5000);
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error);
    });
  }

 

}

