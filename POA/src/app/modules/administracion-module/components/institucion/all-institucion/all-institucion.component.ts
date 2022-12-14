import { Component, OnInit } from '@angular/core';
import { InstitucionService } from '../../../services/institucion.service';
import { Institucion } from '../../../interfaces/institucion.model';
import { Pei } from 'src/app/modules/gestion-pei-module/interfaces-pei/pei.model';
import { Empleado } from '../../../interfaces/empleado.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-institucion',
  templateUrl: './all-institucion.component.html',
  styleUrls: ['./all-institucion.component.css']
})
export class AllInstitucionComponent implements OnInit {
toRoles() {
  this.router.navigate(['/admin/roles'])
}
  

  constructor(private service:InstitucionService,
              private fb: FormBuilder,
              private router:Router) { 
  }

  ngOnInit(): void {
    this.getInstiFromDB();
    }
  // miembros de clase
  public validateForm: any;
  public filter:string = '';
  public nombreEmpleado:string='';
  public rolSeleccionado:string='';
  public editMode:boolean=false;
  public createMode:boolean=false;
  public idInstiToDelete:number=0;
  public instiToUpdate: Institucion | any;
  public mode:string='view';
  public instiFromDb:Array<Institucion> = [];

  async getInstiFromDB(){
    await this.service.getInstituciones().subscribe((response:Array<Institucion>)=>{
      this.instiFromDb = response;
      console.log(response);
      return response;
    })
  }

  async crearInsti(nombre:string,descripcion:string){
    try{

    await this.service.crearInstitucion(nombre,descripcion).subscribe((response:any) =>{
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
  async updateInsti(nombre:string,descripcion:string){
    try{
      
    await this.service.updateInstitucion(nombre,descripcion,this.instiToUpdate.id).subscribe((response:any) =>{
      console.log("nom: "+nombre + " desc: "+descripcion + " id: "+ this.instiToUpdate.id);
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

  async Delete(){
    try{
      if(this.idInstiToDelete === 0){
        console.log("no cambiado");
        return 
      }
    await this.service.eliminarInstitucion(this.idInstiToDelete).subscribe((res:any)=>{
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
    this.idInstiToDelete = number;
  }
  setUpdate(insti:Institucion){
    this.instiToUpdate = insti;
    this.editMode = true;
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
