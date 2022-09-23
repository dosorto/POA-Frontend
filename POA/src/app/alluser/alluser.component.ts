import { UsersService } from '../services/users.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {
 userList: any = [];
    id=String;
  //dataSource = this.userList;  // MatPaginator Output
    /*@ViewChild(MatPaginator) paginator!: MatPaginator; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/


  constructor( private userService: UsersService) { 
    console.log('El componente se ha iniciado');
  }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    //this.userService.getIdUser(this.id).subscribe((response : any) => console.log(response));
    this.userService.getUsers().subscribe((response:any) => this.userList = response.allusers);
  }

}
