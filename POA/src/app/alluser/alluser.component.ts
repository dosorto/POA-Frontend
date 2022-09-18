import { UsersService } from '../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {
  userList: any = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  


  constructor( private userService: UsersService) { 
    console.log('El componente se ha iniciado');
  }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    //this.userService.getUsers().subscribe((response : any) => console.log(response));
    this.userService.getUsers().subscribe((response:any) => this.userList = response.allusers);
  }

}
