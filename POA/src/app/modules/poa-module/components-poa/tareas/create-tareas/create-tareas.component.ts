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
import { Poa } from '../../../interfaces-poa/poa.model';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { Depto } from '../../../interfaces-poa/depto.model';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;
  selected = "4"
  hide = true;

  value = 'Clear me';

  panelColor = new FormControl('red');

  public gastosFuente11:number=0
  public gastosFuente12:number=0  
  public gastosFuente12B:number=0  
  public listFuente11: Array<Tareas>=[];
  public listFuente12: Array<Tareas>=[];
  public listFuente12B: Array<Tareas>=[];
  
  public ActividadList: Actividad | any = {};
  public indicadores:Array<Indicadores>=[]; // para llenar la tabla
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {}
  
  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  //public idActividad=1
  public idDepto = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idPoa = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));


  public saldo: number=0
  public saldo1: number=0
  public saldo2: number=0
  //public PoaList: Poa | any = {}

  public unidadmedida_seleccionado:string="";
  public objetogasto_seleccionado:string="";
  public grupogasto_seleccionado:string="";
  public fuente_seleccionado:string="";

  public listTareas : Array<Tareas>=[];
  public listTareasP: Array<Tareas>=[];
  public listTareasH: Array<TareasH>=[];
  public nombre:string=""; // para filtar la tabla
  public objeto:any

  constructor( private Storage:Storage, 
    private tareasService: TareasService,
    private actividadService:ActividadService,
    private router:Router,
    private _route: ActivatedRoute) { }

    // Variable que recoge idActividad
    // public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
    

  ngOnInit(): void {
    //this.mostrarObjeto(this.nombre)
    this.initData()
    //this.mostrarObjeto(this.nombre)
    //this.mostrarObjeto2(this.nombre)
  }
  isPresupuesto:boolean=false;
  async crear_Tarea(nombre:string,descripcion:string,isPresupuesto:boolean,
    cantidad:number,costounitario:number,total:number,idobjeto:number,idfuente:number,iduniad:number){
      //if((costounitario==0)){costounitario = this.tareass.presupuesto.costounitario}
    
      if(this.isPresupuesto){
      //let isPresupuesto=true;
   
    total=cantidad*costounitario
    idobjeto=this.objeto
    console.log(nombre.toString(),descripcion,isPresupuesto,this.idActividad,idobjeto,idfuente,costounitario,total,cantidad);
    await this.tareasService.crearTarea(nombre,descripcion,isPresupuesto,this.idActividad,
      cantidad,costounitario,total,idobjeto,idfuente,iduniad).subscribe((res:any)=>{
    
      Swal.fire({
        icon: 'success',
        title: '¡Tarea creada con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.onBack()
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
        title: '¡Tarea creada con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.onBack()
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
public costounitario:any
public cantidad:number=0
public total:number=0
// numero1= Number(this.costounitario)
// numero=Number(this.cantidad)

public tareass:Presupuesto | any = {};
  List:Array<Tareas>=[];
  mostrarObjeto(nombre:string): void {
    this.tareasService.Probando(nombre).subscribe({
      next: tareas => {this.tareass = tareas}
      // error: err => this.errorMessage = err
      
    });
    console.log(this.tareass.idobjeto)
  }

  async mostrarObjeto2 (nombre:string) {
    this.tareass = await this.tareasService.Probando(this.nombre).subscribe((response:any)=>{
      this.tareass = response.tarea;
      //console.log("asdsada",response.tarea.idobjeto);
      //console.log(this.tareass.idobjeto)
      //console.log(response.tarea.idobjeto)
      //console.log("esta es",this.tareass.idobjeto)
      this.objeto=response?.tarea?.idobjeto
    //   if(this.tareass.idobjeto === response.tarea.idobjeto){
        
    //     console.log("aquiiiii")
    //     //this.objeto=response.tarea.idobjeto
    //     this.objeto=this.tareass.idobjeto
    // }else{
    //   console.log("toma este valor")
    //   this.objeto=0
    // }
    
    //console.log("esta es",this.tareass.idobjeto)
    })
    // console.log(this.tareass.idobjeto)
    // console.log(this.objeto)
    //console.log(this.tareass.idobjeto)
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

    this.mostrarObjetos()

    const Fuente11 = await firstValueFrom(this.tareasService.getFuente11(this.idPoa))
this.listFuente11 = Fuente11
// fuente 12
const Fuente12 = await firstValueFrom(this.tareasService.getFuente12(this.idPoa))
this.listFuente12 = Fuente12
// fuente 12B
const Fuente12B = await firstValueFrom(this.tareasService.getFuente12B(this.idPoa))
this.listFuente12B = Fuente12B

  //console.log('aquiii',Fuente11)
  //sumo todos los valores de las tareas que son agregadas a la fuente 11
this.gastosFuente11 = this.listFuente11.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);
//sumo todos los valores de las tareas que son agregadas a la fuente 12
this.gastosFuente12 = this.listFuente12.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);
//sumo todos los valores de las tareas que son agregadas a la fuente 12B
this.gastosFuente12B = this.listFuente12B.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);

this.PoaList = await this.tareasService.getPoa_Id(this.idPoa).subscribe((response:any)=>{
  this.PoaList = response.poa;
  this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
  this.saldo1= +this.PoaList.fuente12 -this.gastosFuente12
  this.saldo2= +this.PoaList.fuente12B - this.gastosFuente12B
})


this.InstiList = await this.tareasService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
  this.InstiList = response.Institucion;
})

this.DeptoList = await this.tareasService.getDepto_Id(this.idDepto).subscribe((response:any)=>{
  this.DeptoList = response.departamento;
})




this.ActividadList = await this.tareasService.getActividad_Id(this.idActividad).subscribe((response:any)=>{
  this.ActividadList = response.actividad;
})

    // this.sumall = this.listTareasP.reduce((sum, value) => (typeof value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    // console.log(this.sumall);

    //  let sum:number = this.listTareas.reduce((acc, cur) => +acc + +cur, 0);
    
//console.log(sum)
    
    // this.sumall = this.listTareas.map(item => item.presupuesto.total??0).reduce((prev, curr) => +prev + +curr,0);
    // console.log(this.sumall)
    
  }
  
  onBack(): void {
    this.router.navigate(['/gestion_poa/tareas/list/',this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
  }

  suma(){
    this.total = (this.cantidad*this.costounitario );
}
ListObjeto: any=[];
//para llenar el select

mostrarObjetos(){
  this.tareasService.getobjeto().subscribe((response:any) => 
  this.ListObjeto = response);
}





}
