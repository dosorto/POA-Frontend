import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { TareasService } from '../../../services-poa/tareas.service';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { ActividadService } from '../../../services-poa/actividad.service';
import { ThemePalette } from '@angular/material/core';
import { ObjetoGasto } from '../../../interfaces-poa/objeto_gasto.model';
import { FormControl } from '@angular/forms';
import { Presupuesto } from '../../../interfaces-poa/presupuesto.model';
import { TareasH } from '../../../interfaces-poa/tareas_historico.model';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  hide = true;

  value = 'Clear me';

  panelColor = new FormControl('red');
  public unidadmedida_seleccionado:string="";
  public objetogasto_seleccionado:string="";
  public grupogasto_seleccionado:string="";
  public fuente_seleccionado:string="";

  public listTareas : Array<Tareas>=[];
  public listTareasP: Array<Tareas>=[];
  public listTareasH: Array<TareasH>=[];
  public nombre:string=""; // para filtar la tabla

  constructor( private Storage:Storage, 
    private tareasService: TareasService,
    private actividadService:ActividadService,
    private router:Router,
    private _route: ActivatedRoute) { }

    // Variable que recoge idActividad
    public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
    

  ngOnInit(): void {
    //this.mostrarObjeto(this.nombre)
    this.initData()
    this.mostrarObjeto(this.nombre)
 
  }
  isPresupuesto:boolean=false;
  async crear_Tarea(nombre:string,descripcion:string,isPresupuesto:boolean,
    cantidad:number,costounitario:number,total:number,idobjeto:number,idfuente:number,iduniad:number){
    if(this.isPresupuesto){
      //let isPresupuesto=true;
   
    total=cantidad*costounitario
    console.log(nombre.toString(),descripcion,isPresupuesto,this.idActividad,idobjeto,idfuente,costounitario,total,cantidad);
    await this.tareasService.crearTarea(nombre,descripcion,isPresupuesto,this.idActividad,
      cantidad,costounitario,total,idobjeto,idfuente,iduniad).subscribe((res:any)=>{
    
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      // this.toList();
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    
  } else{
    await this.tareasService.crearTarea(nombre,descripcion,isPresupuesto,this.idActividad,
      cantidad,costounitario,total,idobjeto,idfuente,iduniad).subscribe((res:any)=>{
    
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      // this.toList();
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    
  }
  } 
  changed(){
    console.log("Hola")
  }

  //public nombre:string="comp";
//   var stringToConvert = "759";
// var numberValue = Number(stringToConvert);
// console.log(numberValue);
// //Returns 759

// var stringToConvert = "A123";
// var numberValue = Number(stringToConvert);
// console.log(numberValue);
costounitario:any
cantidad:any
// numero1= Number(this.costounitario)
// numero=Number(this.cantidad)

public tareass:Presupuesto | any = {};
  List:Array<Tareas>=[];
  mostrarObjeto(nombre:string): void {
    this.tareasService.Probando(nombre).subscribe({
      next: tareas => {this.tareass = tareas}
      // error: err => this.errorMessage = err
    });
  }
  // mostrarObjeto(nombre:string) {
  //   this.tareasService.Probando(nombre).subscribe((response:any) => 
  //   this.List = response);
  //   this.tareasService.Probando(nombre).subscribe((response:any) => 
  //   console.log(response));
    
  //   }

  async initData(){
    
    const tareas = await firstValueFrom(this.tareasService.getTarea(this.idActividad))
    this.listTareas = tareas;

    const tareasP = await firstValueFrom(this.tareasService.getTareaP(this.idActividad))
    this.listTareasP = tareasP;

    const tareasH = await firstValueFrom(this.tareasService.getTareasH())
    this.listTareasH = tareasH;
     
    console.log(tareasH)

    // this.sumall = this.listTareasP.reduce((sum, value) => (typeof value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    // console.log(this.sumall);

    //  let sum:number = this.listTareas.reduce((acc, cur) => +acc + +cur, 0);
    
//console.log(sum)
    
    // this.sumall = this.listTareas.map(item => item.presupuesto.total??0).reduce((prev, curr) => +prev + +curr,0);
    // console.log(this.sumall)
    
  }
}
