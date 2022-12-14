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
import { IndicadorService } from '../poa-module/services-poa/indicador.service';
import { Tareas } from '../poa-module/interfaces-poa/tareas.model';
import { Indicadores } from '../poa-module/interfaces-poa/Indicadores.model';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PoaService,
    private router: Router,
    private serviceT: TareasService,
    private serviceI: IndicadorService,
    private _route: ActivatedRoute) { }

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
  public tarea: Tareas | any = {};
  public indicador: Indicadores | any = {};
  public actividad1: Array<Actividad> = [];
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
  public actividad_seleccionada: number = this.idActividad;
  public ActividadListS: Array<Actividad> = []

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []

  async initData() {
    const actividades = await firstValueFrom(this.service.MostrarAllActivities(this.idPoa));
    this.actividad = actividades;
    console.log("hola", this.actividad);
    this.poa = await firstValueFrom(this.service.MisPOAS(this.user.empleado.id, this.idDepto));
    const poas = await firstValueFrom(this.service.getPOA());
    this.poa = poas;
    console.log(this.poa);

    this.maxPages = Math.round(this.poa.length / this.step);
    // sirve para generar los botones en paginacion
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages + 1);
  }

  selectPoa() {
    this.router.navigate(['/seguimiento/', this.poaSeleccionado,this.idActividad]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }

  toSeguimiento(idIndicador: number) {
    this.router.navigate(['/gestion_poa/indicadores/seguimiento/', idIndicador.toString(), this.idPoa,this.idActividad]);
  }

  selectActividad() {
    this.router.navigate(['/seguimiento/', this.idPoa, this.actividad_seleccionada]);
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
