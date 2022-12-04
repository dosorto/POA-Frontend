import { ActividadService } from './../../../services-poa/actividad.service';
import { PoaService } from './../../../services-poa/poa.service';
import { PeiService } from './../../../../gestion-pei-module/services-pei/pei.service';
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
    private peiService: PeiService,
    private poaService: PoaService,
    private actividadService: ActividadService
  ) {}

  // Obteniendo el id de actividad, poa, instituvcion y depto
  public idActividad: number = Number(
    this._route.snapshot.paramMap.get('idActividad')
  );
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));

  // Variables de tipo modelo para almacenar la actividad, Poa, Institución, el departamento
  public act: Actividad | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public depto: Depto | any = {};

  ngOnInit(): void {
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

  //Para regresar a la lista de planificaciones despues de eliminar
  toList() {
    this.router.navigate([
      '/planificacion/list/:idActividad/:idPoa/:idInsti/:idDepto',
    ]);
  }
  // toList(){
  //   this.router.navigate(['/planificacion/list/', this.idActividad, this.idPoa, this.insti, this.idDepto]);
  // };

  // Crea una nueva planificacion
  async crear_Planificacion(
    trimestre: string,
    cantidad: number,
    fechaInicio: Date,
    fechaFin: Date
  ) {
    console.log(trimestre, cantidad, fechaInicio, fechaFin);

    await this.service
      .crearPlanificacion(trimestre, cantidad, fechaInicio, fechaFin)
      .subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Creado con éxito!',
            showConfirmButton: false,
            timer: 2500,
          });

          this.toList();
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
  }
}
