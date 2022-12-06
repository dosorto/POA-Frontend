import { Depto } from './../../../interfaces-poa/depto.model';
import { Actividad } from './../../../interfaces-poa/actividad.model';
import { ActividadService } from './../../../services-poa/actividad.service';
import { Poa } from './../../../interfaces-poa/poa.model';
import { PoaService } from './../../../services-poa/poa.service';
import { PeiService } from './../../../../gestion-pei-module/services-pei/pei.service';
import { Institucion } from './../../../../administracion-module/interfaces/institucion.model';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PlanificacionService } from '../../../services-poa/planificacion.service';
import { Planificacion } from './../../../interfaces-poa/planificacion.model';

@Component({
  selector: 'app-all-planificacion',
  templateUrl: './all-planificacion.component.html',
  styleUrls: ['./all-planificacion.component.css'],
})
export class AllPlanificacionComponent implements OnInit {
  constructor(
    private Storage: Storage,
    private service: PlanificacionService,
    private router: Router,
    private _route: ActivatedRoute,
    private actividadService: ActividadService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  // Obteniendo el id de actividad, poa, instituvcion y depto
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idActividad: number = Number(this._route.snapshot.paramMap.get('idActividad'));
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));

  // public idActividad: number = 1;
  // public idPoa: number = 1;
  // public idInsti: number = 1;
  // public idDepto: number = 1;

  // Variables de tipo modelo para almacenar la actividad, Poa, Institución, el departamento y la planificacion
  public act: Actividad | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public depto: Depto | any = {};
  public actividadSeleccionada: number = this.idActividad;

  // Para almacenar todas las planificaciones disponibles y la lista de actividades
  public planificaciones: Array<Planificacion> = [];
  public actividadesList: Array<Actividad> = [];

  // Para obtener el usuario
  public user = this.Storage.get_storage('user');

  // Para filtrado de la tabla
  public filter: string = '';

  // Para eliminar una planificacion
  public _delete: string = '';
  // public pei_seleccionado:number=this.idPei;

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = [];
  public resto: number = 0;

  async initData() {

    // obtiene todas las planificaciones que pertenecen a una actividad
    this.planificaciones = await firstValueFrom(
      this.service.getPlanificacionesIdActividad(this.idActividad)
    );
    // Obtiene una lista de actividades que pertenecen a un poa
    this.actividadesList = await firstValueFrom(this.actividadService.getActividades(this.idPoa));
    console.log(this.actividadesList);

    // Busca un poa por el id de poa.
    this.poa = this.actividadService
      .getPoa_Id(this.idPoa)
      .subscribe((response: any) => {
        this.poa = response.poa;
      });
    // Busca una actividad por el id de actividad
    this.act = this.actividadService
      .getActividad(this.idActividad)
      .subscribe((response: any) => {
        this.act = response.actividad;
        console.log(this.act);
      });
    // Busca una Institución por el id de institucion
    this.insti = this.actividadService
      .getInsti_Id(this.idInsti)
      .subscribe((response: any) => {
        this.insti = response.Institucion;
        console.log(this.insti);
      });
    // Busca un departamento por el id de departamento
    this.depto = this.actividadService
      .getDepto_Id(this.idDepto)
      .subscribe((response: any) => {
        this.depto = response.all_deptos;
      });

    this.resto = (this.planificaciones.length % this.step);

    if(this.resto === 0) {
      this.maxPages = (this.planificaciones.length / this.step);
    } else if (this.resto === 3){
      this.maxPages = Math.round(this.planificaciones.length / this.step);
    } else if (this.resto === 4) {
      this.maxPages = Math.round(this.planificaciones.length / this.step);
    } else {
      this.maxPages = Math.round(this.planificaciones.length / this.step) + 1;
    }

    // sirve para generar los botones en paginacion
    this.enumPages = Array(this.maxPages)
      .fill(null)
      .map((x, i) => i)
      .slice(1, this.maxPages + 1);
  }

  // Funcion para el boton de gestionar, pasa por url idPlanificacion, idPoa, idActividad, idInsti, idDepto
  toDetail(idPlanificacion: number) {
    this.router.navigate([
      '/gestion_poa/planificacion/detail/',
      idPlanificacion.toString(),
      this.idPoa,
      this.idActividad,
      this.idInsti,
      this.idDepto,
    ]);
  }
  // Funcion para el boton de crear pasa por la url el idPoa, idActividad, idInsti, idDepto
  toCreate() {
    this.router.navigate([
      '/gestion_poa/planificacion/create/',
        this.idPoa,
        this.idActividad,
        this.idInsti,
        this.idDepto,
    ]);
  }

  // Regresa a la pantalla de POA
  toPoa() {
    this.router.navigate([
      '/gestion_poa/poa/list/',
      this.idInsti,
      this.idUE,
      this.idDepto,
    ]);
  }

  toActividadesList(){
    this.router.navigate(['/gestion_poa/actividad/detail/', this.idActividad, this.idPoa, this.idInsti, this.idDepto]);
  }

  selectActividad(){
    this.router.navigate([
      '/gestion_poa/planificacion/list/',
      this.idPoa,
      this.actividadSeleccionada,
      this.idInsti,
      this.idDepto,
    ]);
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

  set_id_delete(nombre: string) {
    this._delete = nombre;
    console.log(this._delete);
  }
}
