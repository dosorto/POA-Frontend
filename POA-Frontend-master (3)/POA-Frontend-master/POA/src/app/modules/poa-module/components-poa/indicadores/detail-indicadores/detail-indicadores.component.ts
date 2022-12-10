import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import Swal from 'sweetalert2';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model';
import { IndicadorService } from '../../../services-poa/indicador.service';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Poa } from '../../../interfaces-poa/poa.model';

@Component({
  selector: 'app-detail-indicadores',
  templateUrl: './detail-indicadores.component.html',
  styleUrls: ['./detail-indicadores.component.css']
})
export class DetailIndicadoresComponent implements OnInit {

  public idDepto:number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idPoa:number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public indicadores:Indicadores | any = {};
  public _delete: any;
  

  public ActividadList: Actividad | any = {};
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {};


  constructor(private serviceIndicador:IndicadorService,
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  async initData(){
    this.indicadores = await this.serviceIndicador.getIndicador_Id(this.id).subscribe((response:any)=>{
      this.indicadores = response.indicadores;
      console.log(response);
    });

  
      this.InstiList = await this.serviceIndicador.getInsti_Id(this.idInsti).subscribe((response:any)=>{
        this.InstiList = response.Institucion;
      })
  
      this.DeptoList = await this.serviceIndicador.getDepto_Id(this.idDepto).subscribe((response:any)=>{
        this.DeptoList = response.departamento;
      })
  
      this.PoaList = await this.serviceIndicador.getPoa_Id(this.idPoa).subscribe((response:any)=>{
        this.PoaList = response.poa;
      })
  
      this.ActividadList = await this.serviceIndicador.getActividad_Id(this.idActividad).subscribe((response:any)=>{
        this.ActividadList = response.actividad;
      })
  
    }


toTab(){
  this.router.navigate(['/gestion_poa/actividad/tab/',this.idActividad,this.idPoa,this.idDepto,this.idInsti]); //revisar
}

toUpdate(){
  this.router.navigate(['/gestion_poa/indicadores/update/',this.id,this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
}

async Delete(){
  try{
  await this.serviceIndicador.eliminarIndicador(this.id)
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado con éxito!',
      showConfirmButton: false,
      timer: 1000
    });
  setTimeout(function() {
     window.location.reload();
  },1000);
   this.toTab();
}catch(error){
  Swal.fire({
    icon: 'error',
    title: '¡Ha ocurrido un error!',
    showConfirmButton: false,
    timer: 1000
  })
  setTimeout(function() {
    window.location.reload();
  },1000);

}
}
}
