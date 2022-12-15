import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IndicadorService } from '../../../services-poa/indicador.service'; 
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-all-indicadores',
  templateUrl: './all-indicadores.component.html',
  styleUrls: ['./all-indicadores.component.css']
})
export class AllIndicadoresComponent implements OnInit {

  constructor(private indicadorService:IndicadorService, 
              private router: Router, 
              private toastr: ToastrService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initData();
   
  }

  public id:number = Number(this.route.snapshot.paramMap.get('id'));
  public indicadorSeguimiento :Indicadores | any = {};
  public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
  public idDepto = Number(this.route.snapshot.paramMap.get('idDepto'));
  // public idUE = Number(this.route.snapshot.paramMap.get('idUE'))
  public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
  public idActividad = Number(this.route.snapshot.paramMap.get('idActividad'));
  //  public idActividad = 1;
  // public idDepto = 1;
  // public idPoa = 1;
  // public idInsti =1;

  public ActividadList: Actividad | any = {};
  public indicadores:Array<Indicadores>=[]; // para llenar la tabla
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {};
  public ActividadListS : Array<Actividad> = []
  public filter:string=""; 
  // indicador: Indicadores | any = {};
  rutaActual = "Indicadores"; //sirve para definir iconos del sidevar

  //paginacion
public page:number=0;
public actualpage:number = 1;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]

  public actividad_seleccionada:number=this.idActividad;



  async initData(){
    // obtiene todos los resultados
    const indicador = await firstValueFrom(this.indicadorService.getIndicador(this.idActividad))
    this.indicadores = indicador;

    this.InstiList = await this.indicadorService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.InstiList = response.Institucion;
    })

    this.DeptoList = await this.indicadorService.getDepto_Id(this.idDepto).subscribe((response:any)=>{
      this.DeptoList = response.departamento;
    })

    this.PoaList = await this.indicadorService.getPoa_Id(this.idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
    })

    this.ActividadList = await this.indicadorService.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.ActividadList = response.actividad;
    })

    this.ActividadListS = await firstValueFrom(this.indicadorService.getActividades(this.idPoa));
    console.log("00000000"+ this.ActividadListS)


    // sirve para definir un maximo de paginas en paginacion de tablas
    //this.maxPages = ((this.dimensiones.length  % this.step ) === 0 ) ? Math.floor(this.dimensiones.length / this.step) : (Math.floor(this.dimensiones.length / this.step) + 1)// cantidad de paginas para los botones
    this.maxPages = Math.round(this.indicadores.length / this.step);
    
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
}
  


  toDetail(idIndicador:number){
    this.router.navigate(['/gestion_poa/indicadores/detail/',idIndicador.toString(),this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
  }
  toSeguimiento(idIndicador:number){
    this.router.navigate(['/gestion_poa/indicadores/seguimiento/',idIndicador.toString(),this.idActividad]);
  }
  toCreate(){
    this.router.navigate(['/gestion_poa/indicadores/create/',this.idActividad.toString(),this.idPoa,this.idDepto,this.idInsti]);
  }

  selectActividad(){
    this.router.navigate(['/gestion_poa/actividad/tab/',this.actividad_seleccionada,this.idPoa,this.idDepto,this.idInsti]);
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
