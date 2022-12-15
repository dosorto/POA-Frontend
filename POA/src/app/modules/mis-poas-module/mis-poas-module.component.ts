import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { POAFiltroPipe } from '../poa-module/pipes-poa/poafiltro.pipe';
import { PoaService } from '../poa-module/services-poa/poa.service';
import { Poa } from '../poa-module/interfaces-poa/poa.model';
import { Depto } from '../poa-module/interfaces-poa/depto.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Institucion } from '../administracion-module/interfaces/institucion.model';
import { Actividad } from '../poa-module/interfaces-poa/actividad.model';
import { ActividadService } from '../poa-module/services-poa/actividad.service';
import { TareasService } from '../poa-module/services-poa/tareas.service';

@Component({
  selector: 'app-mis-poas-module',
  templateUrl: './mis-poas-module.component.html',
  styleUrls: ['./mis-poas-module.component.css']
})
export class MisPoasModuleComponent implements OnInit {

  constructor(
    private Storage: Storage,
    private service: PoaService,
    private serviceActividad: ActividadService,
    private serviceTarea: TareasService,
    private router: Router,
    private _route: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idActividad: number = Number(this._route.snapshot.paramMap.get('idActividad'));
  public id: number = Number(this._route.snapshot.paramMap.get('id'));

  private poa_example: Poa | any = {};
  rutaActual = "poa";
  public actividad: Actividad | any = {};
  public poa: Array<Poa> = [];
  public DeptoList: Array<Depto> = [];
  public InstitucionesList: Array<Institucion> = [];

  public depto: Depto | any = {};
  public insti: Institucion | any = {};
  public DeptoSeleccionado: number = this.idDepto;
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Poa | any = this.poa_example; // define datos de un elemento a actualizar
  public poa_seleccionado: string = "";
  public poaSeleccionado: number = this.idPoa;

  public POAFiltroPipe: Array <POAFiltroPipe>= []; 


  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []

  async initData() {
    const actividades = await firstValueFrom(this.serviceActividad.getActividades(this.idPoa));
    this.actividad = actividades;
    this.poa = await firstValueFrom(this.service.MisPOAS(this.user.empleado.id,this.idDepto));
    const departamentos = await firstValueFrom(this.service.getdepartamentos());
    this.DeptoList = departamentos;
    console.log(this.poa);
  }
  toDetail(idPoa: number) {
    this.router.navigate(['/gestion_poa/actividad/tab/', idPoa.toString(), this.idInsti, this.idUE, this.idDepto,]);
  }
  toActividad(idPoa: number){
    this.router.navigate(['/gestion_poa/actividad/list/', idPoa.toString(),this.idInsti,this.idDepto,this.idUE]); 
  }

  toHome() {
    this.router.navigate(['/home']);
  }
  selectDepto() {
    this.router.navigate(['/mis_poas/', this.idInsti,this.idUE,this.DeptoSeleccionado]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
  nextPage() {
    this.page = this.page + this.step;
    this.actualpage++;
  }
  previousPage() {
    this.page = this.page - this.step;
    this.actualpage--;
  }
  selectPage(numPage: number) {
    this.page = numPage * this.step;
  }


}
