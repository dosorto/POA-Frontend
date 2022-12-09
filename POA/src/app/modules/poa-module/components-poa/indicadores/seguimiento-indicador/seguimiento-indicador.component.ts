import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { IndicadorService } from '../../../services-poa/indicador.service';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Poa } from '../../../interfaces-poa/poa.model';

@Component({
  selector: 'app-seguimiento-indicador',
  templateUrl: './seguimiento-indicador.component.html',
  styleUrls: ['./seguimiento-indicador.component.css']
})
export class SeguimientoIndicadorComponent implements OnInit {

  constructor(private IndicadoreService:IndicadorService,
              private router:Router,
              private _route: ActivatedRoute) { }

// Obtencion de los id para las rutas
public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));
public idDepto = Number(this._route.snapshot.paramMap.get('idDepto'));
public idPoa = Number(this._route.snapshot.paramMap.get('idPoa'));
public idActividad = Number(this._route.snapshot.paramMap.get('idActividad'));
public id:number = Number(this._route.snapshot.paramMap.get('id'));

//Listas para almacenar los datos
public indicadores:Indicadores | any = {};
public ActividadList: Actividad | any = {};
public InstiList: Institucion | any = {};
public DeptoList: Depto | any = {};
public PoaList: Poa | any = {};

//Variables utilizadas para la funcion seguimiento
public cantidadPlanificada :number=0;
public cantidadEjecutada :number=0;
public promedioAlcanzado :number=0;


ngOnInit(): void {
  this.initData();
  
}

async initData(){
  this.indicadores = await this.IndicadoreService.getIndicador_Id(this.id).subscribe((response:any)=>{
    this.indicadores = response.indicadores;
    console.log(response);
  }
  );

  this.InstiList = await this.IndicadoreService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
    this.InstiList = response.Institucion;
  })

  this.DeptoList = await this.IndicadoreService.getDepto_Id(this.idDepto).subscribe((response:any)=>{
    this.DeptoList = response.departamento;
  })

  this.PoaList = await this.IndicadoreService.getPoa_Id(this.idPoa).subscribe((response:any)=>{
    this.PoaList = response.poa;
  })

  this.ActividadList = await this.IndicadoreService.getActividad_Id(this.idActividad).subscribe((response:any)=>{
    this.ActividadList = response.actividad;
  })
}

toList(){
  this.router.navigate(['/gestion_poa/indicadores/list/',this.idActividad,this.idPoa,this.idDepto,this.idInsti]); //revisar
}

toTab(){
  this.router.navigate(['/gestion_poa/actividad/tab/',this.idActividad,this.idPoa,this.idDepto,this.idInsti]); //revisar
}
promedio(){
    this.promedioAlcanzado = (this.cantidadEjecutada / this.indicadores.cantidadPlanificada );
}

UpdateSeguimiento():any{
  let cantidadPlanificada = this.cantidadPlanificada;
  let cantidadEjecutada = this.cantidadEjecutada;
  let promedioAlcanzado = this.promedioAlcanzado
  console.log(":"+ cantidadPlanificada+":" + ":"+cantidadEjecutada+":"+":"+promedioAlcanzado);
   // validaciones
  if((cantidadPlanificada === 0)){cantidadPlanificada = this.indicadores.cantidadPlanificada}
  if((cantidadEjecutada === 0)){cantidadEjecutada = this.indicadores.cantidadEjecutada}
  if((promedioAlcanzado === 0)){promedioAlcanzado = this.indicadores.promedioAlcanzado}

  console.log(":"+ cantidadPlanificada+":" + ":"+cantidadEjecutada+":"+":"+promedioAlcanzado);
   try{
    this.IndicadoreService.seguimientoIndicador(cantidadPlanificada,cantidadEjecutada,promedioAlcanzado,this.id,this.idActividad).subscribe((res:any)=>{
    
    Swal.fire({
      icon: 'success',
      title: '¡Actualizado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })
   },(error:any)=>{
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      showConfirmButton: false,
      timer: 2500
    })
   });
   this.toTab();
   
 } catch(error){
   console.log(error);
 }
 setTimeout(function() {
  window.location.reload();
},1500);

}
}
