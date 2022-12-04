import Swal from 'sweetalert2';
import { ActividadService } from './../../../services-poa/actividad.service';
import { PoaService } from './../../../services-poa/poa.service';
import { PeiService } from './../../../../gestion-pei-module/services-pei/pei.service';
import { Depto } from './../../../interfaces-poa/depto.model';
import { Poa } from './../../../interfaces-poa/poa.model';
import { Actividad } from './../../../interfaces-poa/actividad.model';
import { Planificacion } from './../../../interfaces-poa/planificacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanificacionService } from './../../../services-poa/planificacion.service';
import { Institucion } from './../../../../administracion-module/interfaces/institucion.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-planificacion',
  templateUrl: './detail-planificacion.component.html',
  styleUrls: ['./detail-planificacion.component.css'],
})
export class DetailPlanificacionComponent implements OnInit {
  // Obteniendo el id de actividad, poa, instituvcion y depto
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idActividad: number = Number(
    this._route.snapshot.paramMap.get('idActividad')
  );
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));

  // Variables para almacenar la planificacion, actividad, poa, institucion y el departamento
  public planificacion: Planificacion | any = {};
  public act: Actividad | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public depto: Depto | any = {};

  constructor(
    // private Storage:Storage,
    private service: PlanificacionService,
    private router: Router,
    private _route: ActivatedRoute,
    private peiService: PeiService,
    private poaService: PoaService,
    private actividadService: ActividadService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.planificacion = this.service
      .getPlanificacion(this.id)
      .subscribe((response: any) => {
        this.planificacion = response.Planificacion;
      });

    this.act = this.actividadService
      .getActividad(this.idActividad)
      .subscribe((response: any) => {
        this.act = response.Actividad;
      });

    this.poa = this.poaService
      .getPOA_Id(this.idPoa)
      .subscribe((response: any) => {
        this.poa = response.Poa;
      });

    this.insti = this.peiService
      .getInsti_Id(this.idInsti)
      .subscribe((response: any) => {
        this.insti = response.Institucion;
      });

    this.depto = this.poaService
      .getDepto_Id(this.idDepto)
      .subscribe((response: any) => {
        this.depto = response.Depto;
      });
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

  // Para el boton de editar, pasa los id por la url
  toUpdate(){
    this.router.navigate(['/planificacion/update/', this.id, this.idPoa, this.idActividad,this.idInsti, this.idDepto]);
  };
  // toUpdate() {
  //   this.router.navigate(['/planificacion/update/', this.id]);
  // }

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
