import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Area } from 'src/app/modules/gestion-pei-module/interfaces-pei/area.model';
import { Objetivo } from 'src/app/modules/gestion-pei-module/interfaces-pei/objetivo.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-actividad-component',
  templateUrl: './all-actividad-component.component.html',
  styleUrls: ['./all-actividad-component.component.css']
})
export class AllActividadComponent implements OnInit {
  constructor(
    private Storage: Storage,
    private service: ActividadService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  public idResultado:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  private area_example : Area | any = {};
  rutaActual = "Area"; //sirve para definir iconos del sidevar
  public actividades:Array<Actividad>=[]; // para llenar la tabla
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
    const actividades = await firstValueFrom(this.service.getActividades(this.idResultado))
    this.actividades = actividades;
    // sirve para definir un maximo de paginas en paginacion de tablas
    this.maxPages = ((this.actividades.length  % this.step ) === 0 ) ? Math.floor(this.actividades.length / this.step) : (Math.floor(this.actividades.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idArea:number){
    this.router.navigate(['/gestion_poa/actividad/detail/',idArea.toString(),this.idResultado]);
  }
  toCreate(){
    this.router.navigate(['/gestion_poa/actividad/create/',this.idResultado.toString()]);
  }
 // toObjetivos(){
   // this.router.navigate(['gestion_pei/objetivos/detail/1/1']);
  //}

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
