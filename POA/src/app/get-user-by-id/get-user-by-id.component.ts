import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { UsuarioService} from '../get-user-by-id/usuario.service';
//import { listUsuario } from '../Modelos/usuario.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-user-by-id',
  templateUrl: './get-user-by-id.component.html',
  styleUrls: ['./get-user-by-id.component.css']
})

export class GetUserByIdComponent implements OnInit {
 
// Variable donde almacenaremos el usuario obtenido
  userList: any=[];
// Variable donde almacenamos el id introducido por el usuario
  id="1";

  constructor( private activerouter:ActivatedRoute, private UsuarioService:UsuarioService, private router:Router) { }

ngOnInit(): void {
//Hacemos uso del metodo para obtener el usuario
  this.getUser();

}
//Lamamos al metodo creado enservicios para obetener un usuario pasando el ID
async getUser(){
    
    this.UsuarioService.getUser(this.id).subscribe(data =>{
    this.userList = data;
    })
}
}
