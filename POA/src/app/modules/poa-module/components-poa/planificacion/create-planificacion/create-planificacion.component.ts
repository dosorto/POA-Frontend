import { ActividadService } from './../../../services-poa/actividad.service';
import { Depto } from './../../../interfaces-poa/depto.model';
import { Poa } from './../../../interfaces-poa/poa.model';
import { Actividad } from './../../../interfaces-poa/actividad.model';
import Swal from 'sweetalert2';
import { Institucion } from './../../../../administracion-module/interfaces/institucion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanificacionService } from './../../../services-poa/planificacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-planificacion',
  templateUrl: './create-planificacion.component.html',
  styleUrls: ['./create-planificacion.component.css'],
})
export class CreatePlanificacionComponent implements OnInit {
  constructor(
    private service: PlanificacionService,
    private router: Router,
    private _route: ActivatedRoute,
    private actividadService: ActividadService
  ) {}

  // Obteniendo el id de actividad, poa, instituvcion y depto
  public idActividad: number = Number(
    this._route.snapshot.paramMap.get('idActividad')
  );
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));

  // Variables de tipo modelo para almacenar la actividad, Poa, Institución, el departamento
  public act: Actividad | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public depto: Depto | any = {};

  ngOnInit(): void {
    // Busca un poa por el id de poa.
    this.poa = this.actividadService
      .getPoa_Id(this.idPoa)
      .subscribe((response: any) => {
        this.poa = response.poa;
        console.log(this.poa);
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
        console.log(this.depto);
      });
  }

  // Para retornar a la lista de planificaciones
  toList() {
    this.router.navigate([
      '/gestion_poa/actividad/tab/',  this.idActividad, this.idPoa, this.idDepto, this.idInsti,
    ]);
  }

  // Para ir a la lista de poas
  toPoa() {
    this.router.navigate([
      '/gestion_poa/poa/list/',
      this.idInsti,
      this.idUE,
      this.idDepto,
    ]);
  }

  // Para mantenerlo en la pantalla de crear mientras edita bien la planificacion
  corregirError() {
    this.router.navigate([
      '/gestion_poa/planificacion/create/',
      this.idPoa,
      this.idActividad,
      this.idInsti,
      this.idDepto,
    ]);
  }

  // Crea una nueva planificacion
  async crear_Planificacion(
    trimestre: string,
    cantidad: number,
    fechaInicio: Date,
    fechaFin: Date
  ) {
    if (fechaInicio < fechaFin) {
      await this.service
        .crearPlanificacion(
          trimestre,
          cantidad,
          fechaInicio,
          fechaFin,
          this.idActividad
        )
        .subscribe((res: any) => {
          console.log(res);
        });

      Swal.fire({
        icon: 'success',
        title: '¡Registrado con éxito!',
        showConfirmButton: false,
        timer: 1500,
      });

      this.toList();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error, revise si ha introducido bien las fechas',
        showConfirmButton: false,
        timer: 2500,
      });

      this.corregirError();
    }
  }
}
