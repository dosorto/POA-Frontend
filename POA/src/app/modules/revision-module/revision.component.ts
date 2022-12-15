import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { PoaService } from '../poa-module/services-poa/poa.service';
import { Poa } from '../poa-module/interfaces-poa/poa.model';
import { Depto } from '../poa-module/interfaces-poa/depto.model';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UnidadEjecutora } from '../poa-module/interfaces-poa/unidad_ejecutora.model';
import { Institucion } from '../administracion-module/interfaces/institucion.model';
import { Area } from '../gestion-pei-module/interfaces-pei/area.model';
import { Actividad } from '../poa-module/interfaces-poa/actividad.model';
import { ActividadService } from '../poa-module/services-poa/actividad.service';
import { TareasService } from '../poa-module/services-poa/tareas.service';
import { Tareas } from '../poa-module/interfaces-poa/tareas.model';
import { Indicadores } from '../poa-module/interfaces-poa/Indicadores.model';
import { RevisionService } from './services/revision.services';
import { Indicador } from '../gestion-pei-module/interfaces-pei/indicadores.model';

//import { Poa } from './interface-revision/poa.model';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {
  public idActividad=1
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public actividad:Actividad|any={};

  constructor(
    private Storage: Storage,
    private service: RevisionService,
    private tareaservice:TareasService,
    private router: Router,
    private _route: ActivatedRoute) { }

  public idDepto : number = 1;
  public idPoa :number=1;
  public listTareas : Array<Tareas>=[]
  public listIndicadores : Array<Indicador>=[]
  public listnPTareas : Array<Tareas>=[]
  public listsPTareas : Array<Tareas>=[]

  public listActividades: Array<Actividad>=[]
  public ActividadList: Actividad | any = {};

  public deptoList:Array<Depto> = [];
  public poaList : Array<Poa> = []
  public PoaList: Poa | any = {}

  public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));

  ngOnInit(): void {
    this.initData(this.idPoa,this.idDepto);
    this.getDeptos();
    this.selectdepto(this.idDepto);
    this.tareas(this.idActividad)
  }

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []


  async initData(idPoa:number,idDepto:number) {

    

    // const tareas = await firstValueFrom(this.service.getPoa_id_iddepto(idPoa,idDepto))
    // this.listTareas = tareas;

    const actividades = await firstValueFrom(this.service.getActvidades(idPoa))
    this.listActividades = actividades

    this.PoaList = await this.service.getPoa_Id(idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
    })

    this.ActividadList = await this.tareaservice.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.ActividadList = response.actividad;
    })

    this.actividad = this.tareaservice.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.actividad = response.Actividad;
    });
  }

  async tareas(idActividad:number){ 
    const tareas = await firstValueFrom(this.tareaservice.getTarea(idActividad))
    this.listTareas = tareas;
    console.log("aquiiii",tareas)
  }

  async getDeptos(){
    await this.service.getDepto().subscribe((response:Array<Depto>)=>{
      this.deptoList = response;
      console.log(response);
      return response;
    })
  }

  async selectdepto(idDepto:number){
    this.poaList = await firstValueFrom(this.service.getPoa(idDepto));
  }

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
  toDetail(idArea:number){
    this.router.navigate(['/revision/tareas/',this.idPoa.toString()]);
  }

  RevisarTareas(id:number){
    this.router.navigate(['/revision/tareas/',id.toString()]);

  }
  

}
