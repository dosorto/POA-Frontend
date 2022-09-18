import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { UserService } from '../../services/user.service';

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
         
      }, (error:any) => {
        this.auth.check = error.status
      })
      
    }
  constructor(private UserService:UserService) { }
  userList : any = [];
  ngOnInit(): void {   
  }
}
