import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-area-component',
  templateUrl: './all-area-component.component.html',
  styleUrls: ['./all-area-component.component.css']
})
export class AllAreaComponentComponent implements OnInit {
  constructor(
    private Storage: Storage,
    private service: AreasService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  public idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  private area_example : Area | any = {};
  rutaActual = "Area"; //sirve para definir iconos del sidevar
  public areas:Array<Area>=[]; // para llenar la tabla
  //public pei:Pei = this.dimensiones[0].pei; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :Area | any = this.area_example; // define datos de un elemento a actualizar
  public pei_seleccionado:string="";
  
  public page:number=0;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  // metodos propios
  async initData(){
    // obtiene todas las dimensiones
    const areas = await firstValueFrom(this.service.getAreas(this.idObjetivo))
    this.areas = areas;
    // sirve para definir un maximo de paginas en paginacion de tablas
    this.maxPages = ((this.areas.length  % this.step ) === 0 ) ? Math.floor(this.areas.length / this.step) : (Math.floor(this.areas.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idArea:number){
    this.router.navigate(['/gestion_pei/areas/detail/',idArea.toString(),this.idObjetivo]);
  }
  toCreate(){
    this.router.navigate(['/gestion_pei/areas/create/',this.idObjetivo.toString()]);
  }
  toObjetivo(){
    this.router.navigate(['/gestion_pei/objetivos/detail/1/1']);
  }

  nextPage(){
    this.page = this.page + this.step;
    console.log(this.page)
  }
  previousPage(){
    this.page = this.page - this.step;
    console.log(this.page)
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }

  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
}
