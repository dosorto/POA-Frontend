import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './changepassword.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

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
  
  try{
  
    const user=this.local.get_storage("user");
  await this.ChangePasswordService.ChangeP(user.id,old_password,new_password,new_password_again).subscribe((res:any)=>{
    console.log(res);
    Swal.fire({
      icon: 'success',
      title: 'Contraseña se cambio con exito',
      showConfirmButton: false,
      timer: 5000
    })
    setTimeout(function() {
      window.location.reload();
    },5000);
    this.router.navigate(['/home/account']); 
  }, (error: any) => {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'las contraseñas no coinciden',
      showConfirmButton: false,
      timer: 2500
    })
    
  });
}


catch(error){
Swal.fire({
  icon: 'error',
  title: 'Ha ocurrido un error ',
  showConfirmButton: false,
  timer: 5000
})
setTimeout(function() {
  window.location.reload();
},5000);
}
}

}
