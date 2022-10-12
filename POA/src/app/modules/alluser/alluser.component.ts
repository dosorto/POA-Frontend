import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { UsuarioModels } from './usuario.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {

// Objeto tipo usuario para usarlo de base
private usuario_example:UsuarioModels.usuario = {
  id:      0,
  email: "",
  username:   "",
  password: "",
  password2: "",
  resetToken: "",
  isDelete:  false,
  createdAt: new Date(),
  updatedAt:  new Date(),
  idEmpleado: 1,
  idRol:1,
  role: {
    id: 0,
    rol: "",
    descripcion: "",
    isDelete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
},
empleado: {
  id: 0,
  dni: "",
  nombre: "",
  apellido: "",
  direccion: "",
  telefono: "",
  fechaNacimiento: new Date(),
  sexo: "",
  isDelete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  idInstitucion: 1,
  
}
}


rutaActual = "Usuario"; //Sirve para definir los iconos en el sidevar
public user = this.Storage.get_storage("user"); //Obtener el usuario logueado
public filter:string=""; //Para filtar la tabla
public _delete: any; // Define que elemento se eliminara
public data_update :UsuarioModels.usuario = this.usuario_example; //Define los datos de un elemento a actualizar
public empleado_seleccionado:string="";
public rol_seleccionado:string="";

// Variable donde almacenaremos el usuario obtenido
userList: any=[];
// Variable donde almacenamos el id introducido por el usuario
  id: any ;
  user1:any ={check:'null'};

  usuarioList: any = []; //Almacena los usuarios y llena la tabla resultado
  empleadoList: any = []; //Almacena los emplados para mostrarlos en los select
  rolList: any = []; //Almacena los roles para mostrarlos en los select


  public page:number=0;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, private usuarioService:UsuarioService) { 
  
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getEmpleado();
    this.getRol();
  }



  //Método que obtiene los resultados mediante el servico creado
async getUsuario(){
  this.usuarioService.getUsuario().subscribe((data:any) =>console.log(data));
  this.usuarioService.getUsuario().subscribe((data:any) =>this.usuarioList = data.allusers);
}
//Método que obtiene las dimensiones mediante el servico creado
async getEmpleado(){
  this.usuarioService.getEmpleado().subscribe((data:any) =>console.log(data));
  this.usuarioService.getEmpleado().subscribe((data:any) =>this.empleadoList = data.empleados);
}
//Método que obtiene las áreas mediante el servico creado
async getRol(){
  this.usuarioService.getRol().subscribe((data:any) =>console.log(data));
  this.usuarioService.getRol().subscribe((data:any) =>this.rolList = data.roles);
}

async getUser(){
    
  this.usuarioService.getUser(this.id).subscribe((data:any) =>{
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

nextPage(){
  this.page = this.page + this.step;
}
previousPage(){
  this.page = this.page - this.step;
}
selectPage(numPage:number){
  this.page = numPage * this.step;
}

set_user_to_update(user:UsuarioModels.usuario){
  this.data_update = user;
}
set_id_delete(username:string){
  this._delete = username;
  console.log(this._delete)
}
async delete(){
  try{
  await this.usuarioService.eliminarUsuario(this._delete).subscribe((res:any)=>{
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado con éxito!',
      showConfirmButton: false,
      timer: 1000
    })
  });
  setTimeout(function() {
    window.location.reload();
  },1000);
}catch(error){
  Swal.fire({
    icon: 'error',
    title: '¡Ha ocurrido un error!',
    showConfirmButton: false,
    timer: 1000
  })
  setTimeout(function() {
    window.location.reload();
  },1000);

}
}


async actualizar_usuario(email:string, username:string, idEmpleado:string, idRol:string){

  if(email === ''){email = this.data_update.email};
  if(username === ''){username = this.data_update.username};
  if(idEmpleado === ''){idEmpleado = this.data_update.idEmpleado.toString()};
  if(idRol === ''){idRol = this.data_update.idRol.toString()};
  await this.usuarioService.actualizarUsuario(this.data_update.id,email,username,parseInt(idEmpleado),parseInt(idRol)).subscribe((res:any)=>{
    Swal.fire({
      icon: 'success',
      title: '¡Actualizado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })
  },(error:any)=>{
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      showConfirmButton: false,
      timer: 2500
    })
  });
  setTimeout(function() {
    window.location.reload();
  },1500);

}
//Método para crear un nuevo resultado
async crear_Usuario(email:string, username:string, password:string, password2:string, idEmpleado:string, idRol:string){
  await this.usuarioService.crearUsuario(email,username,password, password2,parseInt(idEmpleado),parseInt(idRol)).subscribe((res:any)=>{
    Swal.fire({
      icon: 'success',
      title: '¡Creado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })
  },(error:any)=>{
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      showConfirmButton: false,
      timer: 2500
    })
  });
  setTimeout(function() {
    window.location.reload();
  },1500);
}

}
