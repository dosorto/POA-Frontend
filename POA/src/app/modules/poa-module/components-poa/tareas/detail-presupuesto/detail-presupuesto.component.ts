import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { TareasService } from '../../../services-poa/tareas.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
@Component({
  selector: 'app-detail-presupuesto',
  templateUrl: './detail-presupuesto.component.html',
  styleUrls: ['./detail-presupuesto.component.css']
})
export class DetailPresupuestoComponent implements OnInit {



  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  //public idActividad=1
  public idDepto = 1;
  public idPoa = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti =1;
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  // Aqui llamamos las variables
  public listTareas : Array<Tareas>=[];
  public listTareasP: Array<Tareas>=[];
  public sumall: number=0
  public gastosFuente11:number=0
  public gastosFuente12:number=0  
  public gastosFuente12B:number=0  
  public listFuente11: Array<Tareas>=[];
  public listFuente12: Array<Tareas>=[];
  public listFuente12B: Array<Tareas>=[];

  public saldo: number=0
  ////
  public ActividadList: Actividad | any = {};
  public indicadores:Array<Indicadores>=[]; // para llenar la tabla
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {}
  //paginacion
  constructor(private Storage:Storage, 
    private tareaservice:TareasService,
    private router:Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
      this.initData()
  }
  async initData(){
   

    

    // obtengo la lista de las tareas que tienen presupuesto
    // fuente 11
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
    this.gastosFuente11 = this.listFuente11.reduce((sum, value) => (typeof Number(value.presupuesto.total) == "number" ? sum + +value.presupuesto.total : sum), 0);
    //sumo todos los valores de las tareas que son agregadas a la fuente 12
    this.gastosFuente12 = this.listFuente12.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
//sumo todos los valores de las tareas que son agregadas a la fuente 12B
this.gastosFuente12B = this.listFuente12B.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);



    console.log("Aqui",this.gastosFuente11)

    this.InstiList = await this.tareaservice.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.InstiList = response.Institucion;
    })

    this.DeptoList = await this.tareaservice.getDepto_Id(this.idDepto).subscribe((response:any)=>{
      this.DeptoList = response.departamento;
    })


    this.PoaList = await this.tareaservice.getPoa_Id(this.idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
      this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
    })
    console.log('esta es',this.saldo)

    this.ActividadList = await this.tareaservice.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.ActividadList = response.actividad;
    })

    //  let sum:number = this.listTareas.reduce((acc, cur) => +acc + +cur, 0);
    
//console.log(sum)
    
    // this.sumall = this.listTareas.map(item => item.presupuesto.total??0).reduce((prev, curr) => +prev + +curr,0);
    // console.log(this.sumall)
    
  }


}
