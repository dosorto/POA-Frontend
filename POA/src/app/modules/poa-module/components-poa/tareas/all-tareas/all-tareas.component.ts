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


@Component({
  selector: 'app-all-tareas',
  templateUrl: './all-tareas.component.html',
  styleUrls: ['./all-tareas.component.css']
})
export class AllTareasComponent implements OnInit {
  //Variables de la rutas
  // public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
 
  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public actividad:Actividad|any={};
  // Aqui llamamos las variables
  public listTareas : Array<Tareas>=[];
  public listTareasP: Array<Tareas>=[];
  public sumall: number=0
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

  ngOnInit(): void {
    this.initData()
    const sumall = this.listTareas.map(item => item.presupuesto.total).reduce((prev, curr) => prev + curr,0);
    console.log(sumall)
  }

  async initData(){

    const tareas = await firstValueFrom(this.tareaservice.getTarea(this.idActividad))
    this.listTareas = tareas;

    const tareasP = await firstValueFrom(this.tareaservice.getTareaP(this.idActividad))
    this.listTareasP = tareasP;
    this.sumall = this.listTareasP.reduce((sum, value) => (typeof value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    console.log(this.sumall);

    //  let sum:number = this.listTareas.reduce((acc, cur) => +acc + +cur, 0);
    
//console.log(sum)
    
    // this.sumall = this.listTareas.map(item => item.presupuesto.total??0).reduce((prev, curr) => +prev + +curr,0);
    // console.log(this.sumall)
    this.actividad = this.tareaservice.getActividades_Id(this.idActividad).subscribe((response:any)=>{
      this.actividad = response.Actividad;
    });
    
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
