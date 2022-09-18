import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validate(param:any):void{
      this.UserService.signUp(param.username,param.password).subscribe((response:any) => console.log(response));
  }
  constructor(private UserService:UserService) { }
  userList : any = [];
  ngOnInit(): void {   
  }
}
