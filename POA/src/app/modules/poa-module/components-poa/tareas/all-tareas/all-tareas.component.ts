import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TareasService } from '../../../services-poa/tareas.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { ToastrService } from 'ngx-toastr';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Presupuesto } from '../../../interfaces-poa/presupuesto.model';


@Component({
  selector: 'app-all-tareas',
  templateUrl: './all-tareas.component.html',
  styleUrls: ['./all-tareas.component.css']
})
export class AllTareasComponent implements OnInit {
  //Variables de la rutas
 public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  //public idActividad=1
  public idDepto = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idPoa = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));

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
  public page:number=0;
  public actualpage:number = 1;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, 
    private tareaservice:TareasService,
    private actividadService:ActividadService,
    private router:Router,
    private _route: ActivatedRoute) { }

    public filter:string=""; // para filtar la tabla

    //public techo_presupuestario:number=5000
  ngOnInit(): void {
    this.initData()
    const sumall = this.listTareas.map(item => item.presupuesto.total).reduce((prev, curr) => prev + curr,0);
console.log(sumall)
  }

  async initData(){
    const tareas = await firstValueFrom(this.tareaservice.getTarea(this.idActividad))
    this.listTareas = tareas;

    const tareasP = await firstValueFrom(this.tareaservice.getTareaP(this.idPoa))
    this.listTareasP = tareasP;

    this.sumall = this.listTareasP.reduce((sum, value) => (typeof value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    console.log(this.sumall);

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


  
  // selectPei(){
  //   this.router.navigate(['/gestion_pei/dimension/list/',this.pei_seleccionado,this.idInsti]);
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 10)
  // }
  nextPage(){
    this.page = this.page + this.step;
    this.actualpage++;
  }
  previousPage(){
    this.page = this.page - this.step;
    this.actualpage--;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }

  toDetail(id:number){
    this.router.navigate(['/gestion_poa/tareas/detail/',id.toString(),this.idActividad]);
  }
  toCreate(){
    this.router.navigate(['/gestion_poa/tareas/create/',this.idActividad.toString()]);
  }
}
