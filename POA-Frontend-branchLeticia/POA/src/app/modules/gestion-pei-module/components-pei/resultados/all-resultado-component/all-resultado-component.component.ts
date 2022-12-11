import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ResultadosService } from '../../../services-pei/resultados.service';
import { Location } from '@angular/common';

import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
//import { Objetivo } from '../../../interfaces-pei/resultado.model';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { PeiService } from '../../../services-pei/pei.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { ObjetivosService } from '../../../../gestion-pei-module/services-pei/objetivos.service';
import { Resultado } from '../../../interfaces-pei/resultado.model';



@Component({
  selector: 'app-all-resultado-component',
  templateUrl: './all-resultado-component.component.html',
  styleUrls: ['./all-resultado-component.component.css']
})
export class AllResultadoComponentComponent implements OnInit {

  constructor(private Storage:Storage,
              private resultadoService:ResultadosService, 
      	      private router: Router, 
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private PeiService: PeiService,
              private DimensionService:DimensionService,
              private ObjetivoService:ObjetivosService,
              private AreaService:AreasService
              ) { }


  //public areaList : Array<Area> = [];
  ngOnInit(): void {
    this.initData();
  }

  public idInsti:number = Number(this.route.snapshot.paramMap.get('idInsti'));
  public idPei:number = Number(this.route.snapshot.paramMap.get('idPei'));
  public idDimension:number = Number(this.route.snapshot.paramMap.get('idDimension'));
  public idObjetivo:number = Number(this.route.snapshot.paramMap.get('idObjetivo'));
  public idArea = Number(this.route.snapshot.paramMap.get('idArea'));

  public pei:Pei|any={};
  public dimension:Dimension|any={};
  public insti:Institucion|any={};
  public objetivo:Objetivo|any={};
  public area:Area|any={};
  public AreaList: Array<Area> = [];
  private resultado_example : Resultado| any = {};
  public resultados:Array<Resultado>=[]; // para llenar la tabla
  rutaActual = "Resultado"; //sirve para definir iconos del sidevar


 
 

  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :Resultado | any = this.resultado_example; // define datos de un elemento a actualizar
  public area_seleccionado:number=this.idArea;
  
//paginacion
public page:number=0;
public actualpage:number = 1;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]


// metodos propios
async initData(){
  // obtiene todos los resultados
  const resultado = await firstValueFrom(this.resultadoService.getResultados(this.idArea))
  this.resultados = resultado;
  
  this.pei = await this.resultadoService.getPei_Id(this.idPei).subscribe((response:any)=>{
    this.pei = response.pei;
  })
  this.insti = await this.resultadoService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
    this.insti = response.Institucion;
  })
  this.dimension = await this.resultadoService.getDimensio_Id(this.idDimension).subscribe((response:any)=>{
    this.dimension = response.dimension;
  })
  this.objetivo = await this.resultadoService.getObjetivo_Id(this.idObjetivo).subscribe((response:any)=>{
    this.objetivo = response.objetivo;
  })
  this.area = await this.resultadoService.getArea_Id(this.idArea).subscribe((response:any)=>{
    this.area = response.area;
  })

  this.AreaList = await firstValueFrom(this.AreaService.getAreas(this.idObjetivo));
    console.log("00000000"+ this.AreaList)

    // sirve para definir un maximo de paginas en paginacion de tablas
    //this.maxPages = ((this.dimensiones.length  % this.step ) === 0 ) ? Math.floor(this.dimensiones.length / this.step) : (Math.floor(this.dimensiones.length / this.step) + 1)// cantidad de paginas para los botones
    this.maxPages = Math.round(this.resultados.length / this.step);
    
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
}

toDetail(idResultado:number){
  this.router.navigate(['/gestion_pei/resultados/detail/',idResultado.toString(),this.idArea,this.idObjetivo, this.idDimension,this.idPei,this.idInsti]);
}
toCreate(){
  this.router.navigate(['/gestion_pei/resultados/create/',this.idArea.toString(),this.idObjetivo, this.idDimension,this.idPei,this.idInsti]);
}
toArea(){
  this.router.navigate(['/gestion_pei/areas/detail/',this.idArea,this.idObjetivo,this.idDimension,this.idPei,this.idInsti.toString()]);
}
toObjetivo(){
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

selectArea(){
  this.router.navigate(['/gestion_pei/resultados/list/',this.area_seleccionado,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
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

set_id_delete(nombre:string){
  this._delete = nombre;
  console.log(this._delete)
}





}
