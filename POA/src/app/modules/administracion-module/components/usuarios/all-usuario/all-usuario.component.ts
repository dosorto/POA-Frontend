import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../interfaces/user.model';
import { Role } from '../../../interfaces/role.model';
import { Empleado } from '../../../interfaces/empleado.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-usuario',
  templateUrl: './all-usuario.component.html',
  styleUrls: ['./all-usuario.component.css']
})
export class AllUsuarioComponent implements OnInit {
  

  constructor(private service:UserService,
              private fb: FormBuilder) { 
    this.validateForm = this.fb.group({
      username: ['', Validators.required,Validators.minLength(5)],
      empleado: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getUserFromDB();
    this.getRolesFromDB();
    this.getEmpleadosFromDB();
  }
  // miembros de clase
  public validateForm: any;
  public filter:string = '';
  public nombreEmpleado:string='';
  public rolSeleccionado:string='';
  public editMode:boolean=false;
  public createMode:boolean=false;
  public idUserToDelete:number=0;
  public userToUpdate: Usuario | any;
  public mode:string='view';
  public usersFromDb:Array<Usuario> = [];
  public rolesFromDb:Array<Role> = [];
  public empleadosFromDb:Array<Empleado> = [];

  async getUserFromDB(){
    await this.service.getUsers().subscribe((response:Array<Usuario>)=>{
      this.usersFromDb = response;
      return response;
    })
  }
  async getRolesFromDB(){
    await this.service.getRoles().subscribe((response:Array<Role>)=>{
      this.rolesFromDb = response;
      console.log(response);
      return response;
    })
  }
  async getEmpleadosFromDB(){
    await this.service.getEmpleados().subscribe((response:Array<Empleado>)=>{
      this.empleadosFromDb = response;
      return response;
    })
  }
  async crearUsuario(email:string,username:string,password:string,password2:string,empleado:string,rol:string){
    try{

    await this.service.newUser(email,username,password,password2,parseInt(empleado),parseInt(rol)).subscribe((response:any) =>{
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1000);
    }catch(e){
      console.log(e);
    }
  }

  async Delete(){
    try{
      if(this.idUserToDelete === 0){
        console.log("no cambiado");
        return 
      }
    await this.service.deleteUser(this.idUserToDelete).subscribe((res:any)=>{
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
  setDelete(number:number){
    this.idUserToDelete = number;
  }
  setUpdate(user:Usuario){
    this.userToUpdate = user;
    this.editMode = true;
    console.log(this.userToUpdate);
  }
 loadMore(){

  }
  change(){
    if(this.editMode){
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }
}
