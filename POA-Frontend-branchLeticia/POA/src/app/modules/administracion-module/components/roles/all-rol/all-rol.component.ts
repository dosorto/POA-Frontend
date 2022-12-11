import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../interfaces/user.model';
import { Role } from '../../../interfaces/role.model';
import { Empleado } from '../../../interfaces/empleado.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { Permiso } from '../../../interfaces/permiso.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-all-rol',
  templateUrl: './all-rol.component.html',
  styleUrls: ['./all-rol.component.css']
})
export class AllRolComponent implements OnInit {
  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  constructor(private service:UserService,
              private rolService:RolService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getRolesFromDB();
    this.getPermisosFromDB()
  }
  public validateForm: any;
  public filter:string = '';
  public nombreEmpleado:string='';
  public rolSeleccionado:string='';
  private listIdPermisos:Array<number> = [];
  public editMode:boolean=false;
  public createMode:boolean=false;
  public modalVisible:boolean=false;
  public idUserToDelete:number=0;
  public userToUpdate: Role | any;
  public mode:string='view';
  public usersFromDb:Array<Usuario> = [];
  public permisosFromDb:Array<Permiso> = [];
  public permisosFromDbOfRol:Array<Permiso> = [];
  public rolesFromDb:Array<Role> = [];
  public empleadosFromDb:Array<Empleado> = [];
  public list: TransferItem[] = [];

  async getRolesFromDB(){
    await this.service.getRoles().subscribe((response:Array<Role>)=>{
      this.rolesFromDb = response;
      console.log(response);
      return response;
    })
  }
  async getPermisosFromDB(){
    await this.service.getPermisos().subscribe((response:Array<Permiso>)=>{
      this.permisosFromDb = response;
      return response;

    })
  }
  async crearRol(rol:string,descripcion:string){
    try{

    await this.rolService.newRol(rol,descripcion,this.listIdPermisos).subscribe((response:any) =>{
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
  async updateRol(rol:string,descripcion:string){
    try{
    await this.rolService.updateRol(this.userToUpdate.id,rol,descripcion,this.listIdPermisos).subscribe((response:any) =>{
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
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido el siguiente error: '+ e,
        showConfirmButton: true,
        timer: 2500
      })
    }
  }

  async obtenerPermisosFromDbByRol(idRol:number){
    try{
    this.permisosFromDbOfRol = await this.rolService.getPermisosByIdRol(idRol).subscribe((response:any) =>{
      this.permisosFromDbOfRol = response;
      this.setModalVisible()
    });
    }catch(e){
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },1000);
    }
}

  async Delete(){
    try{
      if(this.idUserToDelete === 0){
        console.log("no cambiado");
        return 
      }
    await this.rolService.delete(this.idUserToDelete).subscribe((res:any)=>{
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
  async setUpdate(user:Role){
    this.userToUpdate = user;
    this.editMode = true;
    await this.rolService.getPermisosByIdRol(user.id).subscribe((response:any) =>{
      this.permisosFromDbOfRol = response;
    });
    console.log(this.permisosFromDbOfRol);
    let otherList:Array<number> = []
    for (let i = 0; i < this.permisosFromDb.length; i++) {
      this.list.push({
        key: this.permisosFromDb[i].id.toString(),
        title: this.permisosFromDb[i].Permiso,
        disabled: false,
        direction:'left'
      });
    }
    console.log(this.list);
    for(let i of this.permisosFromDbOfRol){
        otherList.push(i.id)
    }
    console.log(otherList)
    otherList.forEach(idx => (this.list[idx - 1 ].direction = 'right'));
    
  }
 loadMore(){

  }
  change(ret: {} | any): void {
    const operacion = ret.list[0].direction;
    if(ret.list.length === 1){
      const idPermiso = ret.list[0].key;
      if(operacion === 'right'){
        this.listIdPermisos.push(idPermiso);
      } else {
        const index = this.listIdPermisos.indexOf(idPermiso);
        this.listIdPermisos.splice(index, 1);
      }
      
    } else {
      const idPermisos = ret.list
      if(operacion === 'right'){
        for (let x of idPermisos) {
          this.listIdPermisos.push(x.key);
        }
      } else {
        for (let x of idPermisos) {
          const index = this.listIdPermisos.indexOf(x.key);
          this.listIdPermisos.splice(index, 1);
        }
        
      }
    }
  }
  closeModal(){
      this.modalVisible = false;
  }
  setModalVisible(){
    this.modalVisible = true;
  }

}
