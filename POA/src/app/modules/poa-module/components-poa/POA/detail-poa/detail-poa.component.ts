import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { PoaService } from '../../../services-poa/poa.service';

import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";

import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-poa',
  templateUrl: './detail-poa.component.html',
  styleUrls: ['./detail-poa.component.css']
})
export class DetailPoaComponent implements OnInit {

  public idDepto:number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public poa:Poa | any = {};
  public depto:Depto | any = {};
  public unidadejecutora:UnidadEjecutora | any = {};

  constructor(private service:PoaService,
    private router:Router,private _route: ActivatedRoute,
    private Storage:Storage) { }

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.poa = this.service.getPOA_Id(this.id).subscribe((response:any)=>{
      this.poa = response.poa;
    });
    this.depto = this.service.getDepto_Id(this.idDepto).subscribe((response:any)=>{
      this.depto = response.Depto;
    });
  }

  toList(){
   
    this.router.navigate(['/gestion_poa/poa/list/',this.poa?.idDepto]); //revisar
  }
  toUpdate(){
    this.router.navigate(['/gestion_poa/poa/update/',this.id,this.idInsti,this.idDepto]); //revisar
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
    this.toList();
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
