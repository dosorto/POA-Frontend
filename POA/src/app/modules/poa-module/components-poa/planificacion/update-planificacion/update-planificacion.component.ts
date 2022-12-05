import { PeiService } from './../../../../gestion-pei-module/services-pei/pei.service';
import { PoaService } from './../../../services-poa/poa.service';
import { ActividadService } from './../../../services-poa/actividad.service';
import { Depto } from './../../../interfaces-poa/depto.model';
import { Institucion } from './../../../../administracion-module/interfaces/institucion.model';
import { Poa } from './../../../interfaces-poa/poa.model';
import { Actividad } from './../../../interfaces-poa/actividad.model';
import Swal from 'sweetalert2';
import { Planificacion } from './../../../interfaces-poa/planificacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanificacionService } from './../../../services-poa/planificacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-planificacion',
  templateUrl: './update-planificacion.component.html',
  styleUrls: ['./update-planificacion.component.css'],
})
export class UpdatePlanificacionComponent implements OnInit {
  constructor(
    private service: PlanificacionService,
    private router: Router,
    private _route: ActivatedRoute,
    private actividadService: ActividadService,
    private poaService: PoaService,
    private peiService: PeiService
  ) {}

  // Obteniendo el id de actividad, poa, instituvcion y depto
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idActividad: number = Number(
    this._route.snapshot.paramMap.get('idActividad')
  );
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));

  // Variables de tipo modelo para almacenar la actividad, Poa, Institución, el departamento y la planificacion
  public act: Actividad | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public depto: Depto | any = {};

  public planificacion: Planificacion | any = {};

  public trimestre: string = this.planificacion.trimestre;
  public cantidad: number = this.planificacion.cantidad;
  public fechaInicio: Date = this.planificacion.fechaInicio;
  public fechaFin: Date = this.planificacion.fechaInicio;

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.planificacion = this.service
      .getPlanificacion(this.id)
      .subscribe((response: any) => {
        this.planificacion = response.Planificacion;
        console.log(this.planificacion);
        this.trimestre = this.planificacion.trimestre;
        this.cantidad = this.planificacion.cantidad;
        this.fechaInicio = this.planificacion.fechaInicio;
        this.fechaFin = this.planificacion.fechaFin;
      });

    // Busca un poa por el id de poa.
    this.poa = this.poaService
      .getPOA_Id(this.idPoa)
      .subscribe((response: any) => {
        this.poa = response.Poa;
        console.log(this.poa);
      });

    // Busca una actividad por el id de actividad
    this.act = this.actividadService
      .getActividad(this.idActividad)
      .subscribe((response: any) => {
        this.act = response.Actividad;
        console.log(this.act);
      });

    // Busca una Institución por el id de institucion
    this.insti = this.peiService
      .getInsti_Id(this.idInsti)
      .subscribe((response: any) => {
        this.insti = response.Institucion;
        console.log(this.insti);
      });

    // Busca un departamento por el id de departamento
    this.depto = this.poaService
      .getDepto_Id(this.idDepto)
      .subscribe((response: any) => {
        this.depto = response.Depto;
        console.log(this.insti);
      });
  }

  // Pasa al componente de detalles despues de actualizar, regresa al componente de detalles
  // toDetail() {
  //   this.router.navigate(['/planificacion/detail/', this.id]);
  // }
  toDetail() {
    this.router.navigate(['/planificacion/detail/', this.id, this.idPoa, this.idActividad, this.idInsti, this.idDepto,]);
  }

  //Para regresar a la lista de planificaciones despues de eliminar
  // toList() {
  //   this.router.navigate([
  //     '/planificacion/list/:idActividad/:idPoa/:idInsti/:idDepto',
  //   ]);
  // }
  toList(){
    this.router.navigate(['/planificacion/list/', this.idActividad, this.idPoa, this.insti, this.idDepto]);
  };

  // Actualiza la planificacion
  Update(): any {
    let trimestre = this.trimestre;
    let cantidad = this.cantidad;
    let fechaInicio = this.fechaInicio;
    let fechaFin = this.fechaFin;

    try {
      this.service
        .actualizarPlanificacion(
          trimestre,
          cantidad,
          fechaInicio,
          fechaFin,
          this.id
        )
        .subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: '¡Actualizado con éxito!',
              showConfirmButton: false,
              timer: 2500,
            });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ha ocurrido un error',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );

      this.toDetail();
    } catch (error) {
      console.log(error);
    }
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }

  // Para el boton de borrar la planificacion
  async Delete() {
    try {
      await this.service
        .eliminarPlanificacion(this.id)
        .subscribe((res: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado con éxito!',
            showConfirmButton: false,
            timer: 1000,
          });
        });
      setTimeout(function () {
        window.location.reload();
      }, 1000);

      this.toList();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  }
}
