import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import Swal from 'sweetalert2';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Presupuesto } from '../../../interfaces-poa/presupuesto.model';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { TareasService } from '../../../services-poa/tareas.service';

@Component({
  selector: 'app-update-tareas',
  templateUrl: './update-tareas.component.html',
  styleUrls: ['./update-tareas.component.css']
})
export class UpdateTareasComponent implements OnInit {
  color: ThemePalette = 'primary';
  isPresupueseto = true;
  checked = false;
  disabled = false;
  selected = "4"
  isPresupuesto: boolean = false;

  public unidadmedida_seleccionado: string = "";
  public objetogasto_seleccionado: string = "";
  public grupogasto_seleccionado: string = "";
  public fuente_seleccionado: string = "";

  public gastosFuente11:number=0
  public gastosFuente12:number=0  
  public gastosFuente12B:number=0  
  public listFuente11: Array<Tareas>=[];
  public listFuente12: Array<Tareas>=[];
  public listFuente12B: Array<Tareas>=[];

  public id = Number(this.route.snapshot.paramMap.get('id'));
  public idActividad:number = Number(this.route.snapshot.paramMap.get('idActividad'));
  public idDepto = Number(this.route.snapshot.paramMap.get('idDepto'));
public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
  
  public saldo: number=0
  public saldo1: number=0
  public saldo2: number=0

  public PoaList: Poa | any = {}

  public ActividadList: Actividad | any = {};
  public indicadores:Array<Indicadores>=[]; // para llenar la tabla
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  
  
  
  idPresupuesto: number = Number(this.route.snapshot.paramMap.get('idPresupuesto'));

  public tareas: Tareas | any = {};
  //variables 
  public nombre: string = '';
  public descripcion: string = '';
  public costounitario: number = 0
  public cantidad: number = 0
  public total: number = 0
  public idobjeto: number = 0
  public idfuente: number = 0
  public idunidad: number = 0



  constructor(private route: ActivatedRoute,
    private router: Router,
    private tareaservice: TareasService) { }

  ngOnInit(): void {
    this.initData()
    if (this.id) {
      this.getTareass(this.id);
    }
  }

  getTareass(id: number): void {
    this.tareaservice.getTareas(id).subscribe({
      next: tareas => { this.tareas = tareas }
      // error: err => this.errorMessage = err
    });
  }

  public tareass: Presupuesto | any = {};
  List: Array<Tareas> = [];
  mostrarObjeto(nombre: string): void {
    this.tareaservice.Probando(nombre).subscribe({
      next: tareas => { this.tareass = tareas }
      // error: err => this.errorMessage = err
    });
  }
  Update(): any {
    let nombre = this.nombre;
    let descripcion = this.descripcion;
    let cantidad = this.cantidad;
    let costounitario = this.costounitario;
    let total = this.total;
    let idobjeto = this.idobjeto;
    let idfuente = this.idfuente;
    let idunidad = this.idunidad;
    console.log(":" + nombre + ":" + ":" + descripcion);
    // validaciones
    if ((nombre === '')) { nombre = this.tareas.nombre }
    if ((descripcion === '')) { descripcion = this.tareas.descripcion }
    if ((cantidad == 0)) { cantidad = this.tareas.presupuesto.cantidad }
    if ((costounitario == 0)) { costounitario = this.tareas.presupuesto.costounitario }
    if ((total == 0)) { total = this.tareas.presupuesto.total }
    if ((idobjeto == 0)) { idobjeto = this.tareas.presupuesto.idobjeto }
    if ((idfuente == 0)) { idfuente = this.tareas.presupuesto.idfuente }
    if ((idunidad == 0)) { idunidad = this.tareas.presupuesto.idunidad }
    console.log(":" + nombre + ":" + ":" + descripcion);
    try {
    //   if(this.saldo<cantidad * costounitario){
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error! El total supera el saldor',
    //       showConfirmButton: false,
    //       timer: 2500
    //     })
    // }else{
      total = cantidad * costounitario
    
      this.tareaservice.actualizarTarea(nombre, descripcion, this.id, this.isPresupueseto, this.idActividad, cantidad, this.idPresupuesto, costounitario, total, idobjeto, idfuente, idunidad).subscribe((res:any)=>{
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
      //this.onBack()

    } catch (error) {
      console.log(error)
      //this.toDetail();

    }

    Swal.fire({
      icon: 'success',
      title: '¡Actualizado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })

  }
  

  onBack(): void {
    this.router.navigate(['/gestion_poa/tareas/detail/', this.id, this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
  }
  toDetail() {
    this.router.navigate(['/gestion_poa/tareas/detail/', this.id, this.idActividad,this.idPoa,this.idDepto,this.idInsti])
  }


  async initData(){

    // const tareas = await firstValueFrom(this.tareasService.getTarea(this.idActividad))
    // this.listTareas = tareas;

    // const tareasP = await firstValueFrom(this.tareasService.getTareaP(this.idActividad))
    // this.listTareasP = tareasP;

    // const tareasH = await firstValueFrom(this.tareasService.getTareasH())
    // this.listTareasH = tareasH;
     
    // console.log(tareasH)

    // this.mostrarObjetos()

    const Fuente11 = await firstValueFrom(this.tareaservice.getFuente11(this.idPoa))
this.listFuente11 = Fuente11
// fuente 12
const Fuente12 = await firstValueFrom(this.tareaservice.getFuente12(this.idPoa))
this.listFuente12 = Fuente12
// fuente 12B
const Fuente12B = await firstValueFrom(this.tareaservice.getFuente12B(this.idPoa))
this.listFuente12B = Fuente12B

  //console.log('aquiii',Fuente11)
  //sumo todos los valores de las tareas que son agregadas a la fuente 11
this.gastosFuente11 = this.listFuente11.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);
//sumo todos los valores de las tareas que son agregadas a la fuente 12
this.gastosFuente12 = this.listFuente12.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);
//sumo todos los valores de las tareas que son agregadas a la fuente 12B
this.gastosFuente12B = this.listFuente12B.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + +value.presupuesto.total : sum), 0);

this.PoaList = await this.tareaservice.getPoa_Id(this.idPoa).subscribe((response:any)=>{
  this.PoaList = response.poa;
  this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
  this.saldo1= +this.PoaList.fuente12 -this.gastosFuente12
  this.saldo2= +this.PoaList.fuente12B - this.gastosFuente12B
})


this.InstiList = await this.tareaservice.getInsti_Id(this.idInsti).subscribe((response:any)=>{
  this.InstiList = response.Institucion;
})

this.DeptoList = await this.tareaservice.getDepto_Id(this.idDepto).subscribe((response:any)=>{
  this.DeptoList = response.departamento;
})


this.PoaList = await this.tareaservice.getPoa_Id(this.idPoa).subscribe((response:any)=>{
  this.PoaList = response.poa;
  //this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
})
//console.log('esta es',this.saldo)

this.ActividadList = await this.tareaservice.getActividad_Id(this.idActividad).subscribe((response:any)=>{
  this.ActividadList = response.actividad;
})

    // this.sumall = this.listTareasP.reduce((sum, value) => (typeof value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    // console.log(this.sumall);

    //  let sum:number = this.listTareas.reduce((acc, cur) => +acc + +cur, 0);
    
//console.log(sum)
    
    // this.sumall = this.listTareas.map(item => item.presupuesto.total??0).reduce((prev, curr) => +prev + +curr,0);
    // console.log(this.sumall)
    
  }
  
}

