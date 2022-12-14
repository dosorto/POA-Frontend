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
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PoaService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  private poa_example: Poa | any = {};
  rutaActual = "poa";
  public poa: Array<Poa> = [];
  public DeptoList: Array<Depto> = [];
  public DeptoSeleccionado: number = this.idDepto;
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Poa | any = this.poa_example; // define datos de un elemento a actualizar
  public poa_seleccionado: string = "";

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []

}
