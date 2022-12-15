import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Indicador } from '../../gestion-pei-module/interfaces-pei/indicadores.model';
import { Actividad } from '../../poa-module/interfaces-poa/actividad.model';
import { Depto } from '../../poa-module/interfaces-poa/depto.model';
import { Poa } from '../../poa-module/interfaces-poa/poa.model';
import { Tareas } from '../../poa-module/interfaces-poa/tareas.model';
import { UnidadEjecutora } from '../../poa-module/interfaces-poa/unidad_ejecutora.model';
import { ReportesUEService } from '../services-reportes/reportes-ue.service';

@Component({
  selector: 'app-reportes-ue',
  templateUrl: './reportes-ue.component.html',
  styleUrls: ['./reportes-ue.component.css']
})
export class ReportesUEComponent implements OnInit {

  constructor(
      	      private service:ReportesUEService,
              private router:Router,
              private _route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

            
  // public idDepto : number = 1;
  // public idPoa :number=1;
  public idUE : number =1;
  public anio = '2021';
  public listTareas : Array<Tareas>=[]
  // public listIndicadores : Array<Indicador>=[]
  public listnPTareas : Array<Tareas>=[]
  public listsPTareas : Array<Tareas>=[]
  //Listas
  // public listActividades: Array<Actividad>=[]
  // public listActividadesFormulacion: Array<Actividad>=[]
  // public listActividadesReFormulacion: Array<Actividad>=[]
  // public listActividadesRevision: Array<Actividad>=[]
  // public listActividadesAprobada: Array<Actividad>=[]
  // public listActividadesRechazada: Array<Actividad>=[]  

  // public deptoList:Array<Depto> = [];
  public UEList:Array<UnidadEjecutora> = []
  public poaList : Array<Poa> = []
  public PoaList: Poa | any = {}

  public gastosFuente11:number=0
  public gastosFuente12:number=0  
  public gastosFuente12B:number=0  
  public listFuente11: Array<Tareas>=[];
  public listFuente12: Array<Tareas>=[];
  public listFuente12B: Array<Tareas>=[];


  openSnackBar() {
    this._snackBar.open('Procesando descarga POA Unificado'+' '+this.anio, 'undo', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['mat-primary']
    });
  }

  ngOnInit(): void {
    this.getUE();
    this.initData(this.idUE,this.anio)
    this.selectUE(this.idUE)

  }

  displayedColumns: any[] = ['Pei_Institucional','Dimension_Institucional','Objetivo_Institucional',
  'Area_Institucional','Resultado_Institucional','Nombre_Departamento','Nombre_Poa','Año',
  'Fuente11','Fuente12','Fuente12B','Nombre_Actividad','Estado','Tipo_Actividad','Categoria_Actividad',
  'indicador','cantidad_Planificada','cantidad_Ejecutada','promedio_Alcanzado','Nombre_Tarea','Cantidad',
 'costo','total','fuente','grupo','objeto','Trimestre','Fecha_Inicio','Fecha_Final','Encargado'
];

dataSource:any[]=[]

async initData(idUE:number,anio:string){
  // const deptos = await firstValueFrom(this.service.getDepto())
  // this.deptoList = deptos
 
  const tareas = await firstValueFrom(this.service.getPoa_id_idUE(idUE,anio))
  this.listTareas = tareas;

  this.dataSource = this.listTareas;
  // const nptareas = await firstValueFrom(this.service.getnoPTareas(idPoa))
  // this.listnPTareas = nptareas;

  // const sptareas = await firstValueFrom(this.service.getsiPTareas(idPoa))
  // this.listsPTareas = sptareas;

//Actividades
//  const actividades = await firstValueFrom(this.service.getActvidades(idPoa))
//   this.listActividades = actividades

//   const actividades_Formulacion = await firstValueFrom(this.service.getActvidades_Formulacion(idPoa))
//   this.listActividadesFormulacion = actividades_Formulacion

//   const actividades_Reformulacion = await firstValueFrom(this.service.getActvidades_ReFormulacion(idPoa))
//   this.listActividadesReFormulacion = actividades_Reformulacion

//   const actividades_Revision = await firstValueFrom(this.service.getActvidades_Revision(idPoa))
//   this.listActividadesRevision = actividades_Revision

//   const actividades_Aprobada = await firstValueFrom(this.service.getActvidades_Aprobada(idPoa))
//   this.listActividadesAprobada = actividades_Aprobada

//   const actividades_Rechazada = await firstValueFrom(this.service.getActvidades_Rechazada(idPoa))
//   this.listActividadesRechazada = actividades_Rechazada

  
  
  console.log("aqui",this.dataSource)

 
  //console.log("00000000"+ this.poaList)

  // mostrar el techo pres
  // this.PoaList = await this.service.getPoa_Id(idPoa).subscribe((response:any)=>{
  //   this.PoaList = response.poa;
  //  // this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
  // })

      // obtengo la lista de las tareas que tienen presupuesto
  // fuente 11
  // const Fuente11 = await firstValueFrom(this.service.getFuente11(idPoa))
  // this.listFuente11 = Fuente11
  
  // // fuente 12
  // const Fuente12 = await firstValueFrom(this.service.getFuente12(idPoa))
  // this.listFuente12 = Fuente12
  // // fuente 12B
  // const Fuente12B = await firstValueFrom(this.service.getFuente12B(idPoa))
  // this.listFuente12B = Fuente12B

  // this.gastosFuente11 = this.listFuente11.reduce((sum, value) => (typeof Number(value.presupuesto.total) == "number" ? sum + +value.presupuesto.total : sum), 0);
  // //sumo todos los valores de las tareas que son agregadas a la fuente 12
  // this.gastosFuente12 = this.listFuente12.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
  // //sumo todos los valores de las tareas que son agregadas a la fuente 12B
  // this.gastosFuente12B = this.listFuente12B.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);

}

async selectUE(idUE:number){
  this.poaList = await firstValueFrom(this.service.getPoa(idUE));
}



async getUE(){
  await this.service.getUE().subscribe((response:Array<UnidadEjecutora>)=>{
    this.UEList = response;
    console.log(response);
    return response;
  })
}


}
