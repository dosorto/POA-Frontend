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
import { DeptoService } from '../../../services/Depto.service';
import { Departamento } from '../../../interfaces/depto.model';
@Component({
  selector: 'app-all-depto',
  templateUrl: './all-depto.component.html',
  styleUrls: ['./all-depto.component.css']
})
export class AllDepartamentoComponent implements OnInit {

  

  constructor(private UeService:UeService,
              private service:DeptoService,
              private fb: FormBuilder,
              private router:Router,
              private _route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getDeptosFromDB();

    }
  // miembros de clase
  public idUe:number = Number(this._route.snapshot.paramMap.get('id'));
  public validateForm: any;
  public ue:UnidadEjecutora|any;
  public filter:string = '';
  public nombreEmpleado:string='';
  public rolSeleccionado:string='';
  public editMode:boolean=false;
  public createMode:boolean=false;
  public idDeptoToDelete:number=0;
  public deptoToUpdate: Departamento | any;
  public mode:string='view';
  public deptoFromDb:Array<Departamento> = [];

  async getDeptosFromDB(){
    await this.service.getAllDeptos(this.idUe).subscribe((response:Array<Departamento>)=>{
      this.deptoFromDb = response;
      console.log(response);
      return response;
    })
  }

  async crearDepto(nombre:string,descripcion:string){
    try{

    await this.service.crearDepto(nombre,descripcion,this.idUe).subscribe((response:any) =>{
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
  async updateDepto(nombre:string,descripcion:string){
    try{
      
    await this.service.updateDepto(nombre,descripcion,this.deptoToUpdate.id).subscribe((response:any) =>{
      console.log("nom: "+nombre + " desc: "+descripcion + " id: "+ this.deptoToUpdate.id);
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
      if(this.idDeptoToDelete === 0){
        console.log("no cambiado");
        return 
      }
    await this.service.eliminarDepto(this.idDeptoToDelete).subscribe((res:any)=>{
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
    this.idDeptoToDelete = number;
  }
  setUpdate(depto:Departamento){
    this.deptoToUpdate = depto;
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
