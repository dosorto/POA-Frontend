import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Objetivos } from '../../../interfaces-pei/resultado.model';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { PeiService } from '../../../services-pei/pei.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { ObjetivosService } from '../../../../gestion-pei-module/services-pei/objetivos.service';

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
    private _route: ActivatedRoute,
    private PeiService: PeiService,
    private DimensionService:DimensionService,
    private ObjetivoService:ObjetivosService
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  public idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  private area_example : Area | any = {};
  rutaActual = "Area"; //sirve para definir iconos del sidevar
  public areas:Array<Area>=[]; // para llenar la tabla
  public ObjetivoList: Array<Objetivos> = [];
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idDimension:number = Number(this._route.snapshot.paramMap.get('idDimension'));
  public pei:Pei|any={};
  public dimension:Dimension|any={};
  public insti:Institucion|any={};
  public objetivo:Objetivo|any={};
  //public pei:Pei = this.dimensiones[0].pei; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :Area | any = this.area_example; // define datos de un elemento a actualizar
  public objetivo_seleccionado:string="";
  
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

    this.pei = await this.PeiService.getPEI_Id(this.idPei).subscribe((response:any)=>{
      this.pei = response.pei;
    })
    this.insti = await this.PeiService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion;
    }) 
    this.dimension = await this.DimensionService.getDimension(this.idDimension).subscribe((response:any)=>{
      this.dimension = response.dimension;
    })
    
    this.ObjetivoList = await firstValueFrom(this.ObjetivoService.mostrar_objetivo_id(this.idDimension));
    console.log("00000000"+this.ObjetivoList)
      //this.router.navigate(['/gestion_pei/objetivos/list/',id]);
    
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idArea:number){
    this.router.navigate(['/gestion_pei/areas/detail/',idArea.toString(),this.idObjetivo, this.idDimension,this.idPei,this.idInsti]);
  }
  toCreate(){
    this.router.navigate(['/gestion_pei/areas/create/',this.idObjetivo.toString(), this.idDimension,this.idPei,this.idInsti]);
  }
  toObjetivoslist(){
    this.router.navigate(['/gestion_pei/objetivos/detail/',this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
  }
  toInsti(){
    this.router.navigate(['/gestion_pei/pei/list/',this.idInsti.toString()]);
  }
  toDimension(){
    this.router.navigate(['/gestion_pei/dimension/detail/',this.idDimension,this.idPei,this.idInsti.toString()]);
  }
  toPei(){
    this.router.navigate(['/gestion_pei/pei/detail/',this.idPei,this.idInsti.toString()]);
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
  selectObjetivo(){
    this.router.navigate(['/gestion_pei/areas/list/',this.objetivo_seleccionado,this.idDimension,this.idPei,this.idInsti]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
}
