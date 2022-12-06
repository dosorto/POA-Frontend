import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { IndicadorService } from '../../../services-poa/indicador.service';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';

@Component({
  selector: 'app-update-indicadores',
  templateUrl: './update-indicadores.component.html',
  styleUrls: ['./update-indicadores.component.css']
})
export class UpdateIndicadoresComponent implements OnInit {

  constructor(private IndicadoreService:IndicadorService,
              private router:Router,
              private _route: ActivatedRoute) { }

public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));
public idDepto = Number(this._route.snapshot.paramMap.get('idDepto'));
public idPoa = Number(this._route.snapshot.paramMap.get('idPoa'));
public idActividad = Number(this._route.snapshot.paramMap.get('idActividad'));
public id:number = Number(this._route.snapshot.paramMap.get('id'));


public nombre:string='';
public descripcion:string='';
public cantidadPlanificada:number=0;

public indicadores:Indicadores | any = {};
public ActividadList: Actividad | any = {};
public InstiList: Institucion | any = {};
public DeptoList: Depto | any = {};
public PoaList: Poa | any = {};

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

  toDetail(){
    this.router.navigate(['/gestion_poa/indicadores/detail/',this.id,this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
  }

  Update():any{
    let nombre = this.nombre;
    let descripcion = this.descripcion
    let cantidadPlanificada = this.cantidadPlanificada
    console.log(":"+nombre+":" + ":"+descripcion+":"+cantidadPlanificada);
     // validaciones
    if((nombre === '')){nombre = this.indicadores.nombre}
    if((descripcion === '')){descripcion = this.indicadores.descripcion}
    if((cantidadPlanificada === 0)){cantidadPlanificada = this.indicadores.cantidadPlanificada}
 
    console.log(":"+nombre+":" + ":"+descripcion+":"+cantidadPlanificada);
     try{
      this.IndicadoreService.updateIndicador(nombre,descripcion,cantidadPlanificada,this.id,this.idActividad).subscribe((res:any)=>{
      
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
     this.toDetail();
     
   } catch(error){
     console.log(error);
   }
   setTimeout(function() {
    window.location.reload();
  },1500);
 
  
  }
 

}
