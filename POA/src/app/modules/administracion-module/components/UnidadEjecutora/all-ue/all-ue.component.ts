import { Component, OnInit } from '@angular/core';
import { InstitucionService } from '../../../services/institucion.service';
import { Institucion } from '../../../interfaces/institucion.model';
import { Pei } from 'src/app/modules/gestion-pei-module/interfaces-pei/pei.model';
import { Empleado } from '../../../interfaces/empleado.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UeService } from '../../../services/UE.service';
import { UnidadEjecutora } from 'src/app/modules/poa-module/interfaces-poa/unidad_ejecutora.model';

@Component({
  selector: 'app-all-ue',
  templateUrl: './all-ue.component.html',
  styleUrls: ['./all-ue.component.css']
})
export class AllUnidadEjecutoraComponent implements OnInit {
toRoles() {
  this.router.navigate(['/admin/roles'])
}
  

  constructor(private InstiService:InstitucionService,
              private service:UeService,
              private fb: FormBuilder,
              private router:Router,
              private _route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getUeFromDB();

    }
  // miembros de clase
  public idInsti:number = Number(this._route.snapshot.paramMap.get('id'));
  public validateForm: any;
  public insti:Institucion|any;
  public filter:string = '';
  public nombreEmpleado:string='';
  public rolSeleccionado:string='';
  public editMode:boolean=false;
  public createMode:boolean=false;
  public idUeToDelete:number=0;
  public ueToUpdate: UnidadEjecutora | any;
  public mode:string='view';
  public ueFromDb:Array<UnidadEjecutora> = [];

  async getUeFromDB(){
    await this.service.getAllUE(this.idInsti).subscribe((response:Array<UnidadEjecutora>)=>{
      this.ueFromDb = response;
      console.log(response);
      return response;
    })
  }

  async crearUe(nombre:string,descripcion:string){
    try{

    await this.service.crearUe(nombre,descripcion,this.idInsti).subscribe((response:any) =>{
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
  async updateUe(nombre:string,descripcion:string){
    try{
      
    await this.service.updateUe(nombre,descripcion,this.ueToUpdate.id).subscribe((response:any) =>{
      console.log("nom: "+nombre + " desc: "+descripcion + " id: "+ this.ueToUpdate.id);
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
      if(this.idUeToDelete === 0){
        console.log("no cambiado");
        return 
      }
    await this.service.eliminarUe(this.idUeToDelete).subscribe((res:any)=>{
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
    this.idUeToDelete = number;
  }
  setUpdate(ue:UnidadEjecutora){
    this.ueToUpdate = ue;
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
