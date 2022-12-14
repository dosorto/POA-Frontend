import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-pei',
  templateUrl: './all-pei.component.html',
  styleUrls: ['./all-pei.component.css']
})
export class AllPeiComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PeiService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  private pei_example: Pei | any = {};
  rutaActual = "pei";
  public pei: Array<Pei> = [];
  public InstiList: Array<Institucion> = [];
  public InstiSeleccionado : number = this.idInsti;
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Pei | any = this.pei_example; // define datos de un elemento a actualizar
  public pei_seleccionado: string = "";

  public page:number=0;
  public actualpage:number = 1;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]


  async initData() {
    this.pei = await firstValueFrom(this.service.MostrarPei(this.idInsti));
    const instituciones = await firstValueFrom(this.service.getInstituciones());
    this.InstiList = instituciones;
    console.log(this.pei);
    this.maxPages = Math.round(this.pei.length / this.step);
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
  }
  toDetail(idPei: number) {
    this.router.navigate(['/gestion_pei/pei/detail/', idPei.toString(), this.idInsti]);
  }
  toCreate() {
    this.router.navigate(['/gestion_pei/pei/create/', this.idInsti.toString()]);
  }
  toHome(){
    this.router.navigate(['/home']);
  }
  selectInsti(){
    this.router.navigate(['/gestion_pei/pei/list/',this.InstiSeleccionado]);
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