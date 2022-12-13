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

//import { Poa } from './interface-revision/poa.model';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {


  constructor(
    private Storage: Storage,
    private service: PoaService,
    private serviceActividad: ActividadService,
    private serviceTarea: TareasService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));

  private poa_example: Poa | any = {};
  rutaActual = "poa";

  public actividad:Actividad|any={};
  public poa: Array<Poa> = [];
  public DeptoList: Array<Depto> = [];
  public InstitucionesList: Array<Institucion> = [];
  public indicadores:Array<Indicadores>=[];
    // Aqui llamamos las variables
    public listTareas : Array<Tareas>=[];
    public listTareasP: Array<Tareas>=[];

  public depto: Depto | any = {};
  public insti: Institucion | any = {};


  private area_example: Area | any = {};
  public actividades: Array<Actividad> = []; // para llenar la tabla
  public data_updateA: Area | any = this.area_example; // define datos de un elemento a actualizar
  public pei_seleccionado: string = "";


  public DeptoSeleccionado: number = this.idDepto;
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Poa | any = this.poa_example; // define datos de un elemento a actualizar
  public poa_seleccionado: string = "";
  public poaSeleccionado: number = this.idPoa;

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []

  async initData() {
    const tareas = await firstValueFrom(this.serviceTarea.getTarea(1))
    this.listTareas = tareas;

    const tareasP = await firstValueFrom(this.serviceTarea.getTareaP(this.idPoa))
    this.listTareasP = tareasP;

    const actividades = await firstValueFrom(this.serviceActividad.getActividades(1));
    this.actividades = actividades;
    
    this.poa = await firstValueFrom(this.service.MostrarPoa(1));

    const departamentos = await firstValueFrom(this.service.getdepartamentos());
    this.DeptoList = departamentos;
    console.log(this.poa);

  }
  selectPoa() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.poaSeleccionado, this.idInsti, this.idDepto,this.idUE]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }

  toDetail(idPoa: number) {
    this.router.navigate(['/revision/tareas/', idPoa.toString()]);
  }
  toHome() {
    this.router.navigate(['/home']);
  }
  selectDepto() {
    this.router.navigate(['/gestion_poa/poa/list/', this.idInsti, this.idUE, this.DeptoSeleccionado]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
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

  

}
