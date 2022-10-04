import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { UserService} from '../../services/user.service';
//import { listUsuario } from '../Modelos/usuario.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})

export class UserroleComponent implements OnInit {

// Variable donde almacenaremos el usuario con su rol obtenido
  userroleList: any=[];
// Variable donde almacenamos el username introducido por el usuario
  username="";

  constructor( private activerouter:ActivatedRoute, private UserService:UserService, private router:Router) { }

ngOnInit(): void {
//Hacemos uso del metodo para obtener el rol del usuario
  this.getUserrole();

}
//Llamamos al metodo creado en servicios para obtener el rol del usuario con el nombre de usuario
async getUserrole(){

    this.UserService.getUserrole(this.username).subscribe(data =>{
    this.userroleList = data;
    })
}
}
