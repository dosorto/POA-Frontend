import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './login.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth:any = {check:'null'};
  validate(param:any):void{
      this.UserService.signIn(param.username,param.password)
      .subscribe((response:any) =>{
         this.auth = response;
         console.log(response);
         this.local.create_storage("user", JSON.stringify(response));
         this.router.navigate(['/home']);
      }, (error:any) => {
        this.auth.check = error.status
      })
      
    }
  constructor( private route: ActivatedRoute,
               private router: Router,
               private UserService:UserService,
               private local:Storage) { }
  userList : any = [];
  ngOnInit(): void {   
  }
}
