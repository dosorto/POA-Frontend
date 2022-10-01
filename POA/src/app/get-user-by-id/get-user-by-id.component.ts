import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService} from '../SERVICES/usuario.service';
//import { AlertService } from '../SERVICES/alert.service';


@Component({
  selector: 'app-get-user-by-id',
  templateUrl: './get-user-by-id.component.html',
  styleUrls: ['./get-user-by-id.component.css']
})

export class GetUserByIdComponent implements OnInit {
 
// Variable donde almacenaremos el usuario obtenido
  userList: any=[];
// Variable donde almacenamos el id introducido por el usuario
  id: any ;
  user:any ={check:'null'};
  constructor(private UsuarioService:UsuarioService, private router:Router) { }

ngOnInit(): void {
  
}
//Lamamos al metodo creado enservicios para obetener un usuario pasando el ID
async getUser(){
    
    this.UsuarioService.getUser(this.id).subscribe((data:any) =>{
        this.userList = data;
        console.log(data);
}, (error:any)=>{
    this.user.check = error.status
})
  }
//Utilizada para limpiar la tabla y el input
cleanData(){
  this.userList = '';
  this.id=''
  window.location.reload();

}
 
}
