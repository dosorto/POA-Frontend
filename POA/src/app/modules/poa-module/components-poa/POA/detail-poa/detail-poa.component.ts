import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { PoaService } from '../../../services-poa/poa.service';

import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../../interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';

import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';

@Component({
  selector: 'app-detail-poa',
  templateUrl: './detail-poa.component.html',
  styleUrls: ['./detail-poa.component.css']
})
export class DetailPoaComponent implements OnInit {

  public idDepto:number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public anio:any = this._route.snapshot.paramMap.get('anio');
  public idObjetivo: number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  public idPresupuesto: number = Number(this._route.snapshot.paramMap.get('idPresupuesto'));
  public poa:Poa | any = {};
  public depto:Depto | any = {};
  public insti:Institucion | any = {};
  public unidadejecutora:UnidadEjecutora | any = {};
  public UePresupesto: any;

  constructor(private service:PoaService,
    private router:Router,private _route: ActivatedRoute,
    private Storage:Storage,
    private Ueservice:UePresupuesto) { }

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.poa = this.service.getPOA_Id(this.id).subscribe((response:any)=>{
      this.poa = response.poa;
    });
    this.depto = await this.service.getDepto_Id(this.idDepto).subscribe((response: any) => {
      this.depto = response.all_deptos;
    })
    this.UePresupesto = await this.Ueservice.getrUE(1).subscribe(
      (response:any)=>{
        this.UePresupesto = response})
  }

  onBack(): void {
    this.router.navigate(['/gestion_poa']);
  }

  toUpdate(){
    this.router.navigate(['/gestion_poa/poa/update/',this.id,this.idInsti,this.idUE,this.idDepto,this.anio]); //revisar
  }

  toActividad(){
    this.router.navigate(['/gestion_poa/actividad/list/', this.id,this.idInsti,this.idDepto,this.idUE]);  //revisar
  }


  async Delete(){
    try{
    await this.service.eliminarPOA(this.id).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado con éxito!',
        showConfirmButton: false,
        timer: 1000
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1000);
    this.onBack();
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
