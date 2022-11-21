import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { PoaService } from '../../../services-poa/poa.service';

import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";

import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-poa',
  templateUrl: './all-poa.component.html',
  styleUrls: ['./all-poa.component.css']
})
export class AllPoaComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PoaService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
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
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []

  async initData() {
    this.poa = await firstValueFrom(this.service.getPOA());
    const departamentos = await firstValueFrom(this.service.getdepartamentos());
    this.DeptoList = departamentos;
    console.log(this.poa);
    this.maxPages = Math.round(this.poa.length / this.step);
    // sirve para generar los botones en paginacion
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages + 1);
  }

  toDetail(idPoa: number) {
    this.router.navigate(['/gestion_poa/poa/detail/', idPoa.toString(), this.idUE ,this.idDepto]);
  }
  toCreate() {
    this.router.navigate(['/gestion_poa/poa/create/', this.idDepto.toString()]);
  }
  toHome() {
    this.router.navigate(['/home']);
  }
  selectDepto() {
    this.router.navigate(['/gestion_poa/poa/list/', this.DeptoSeleccionado]);
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
