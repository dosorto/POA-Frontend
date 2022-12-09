import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";


@Component({
  selector: 'app-detail-actividad-component',
  templateUrl: './detail-actividad-component.component.html',
  styleUrls: ['./detail-actividad-component.component.css']
})
export class DetailActividadComponent implements OnInit {
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idPoa:number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public poaList: Array<Poa> = [];
  public DeptoList: Array<Depto> = []; 
  public InstitucionesList: Array<Institucion> = [];
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public UEList: Array<UnidadEjecutora> = [];
  //public area:Area | any = {};


  actividad: Actividad | any = {};
  errorMessage = '';



  _delete: string = "";


  constructor(private Storage: Storage,
    private service: ActividadService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    if (id) {
      this.getActividades(id);
    }
    console.log(this.actividad?.id)

  }
  getActividades(id: number): void {
    this.service.getActividadess(id).subscribe({
      next: actividad => { this.actividad = actividad },
      error: err => this.errorMessage = err
    });
  }

  /*async initData(){
   this.area = await this.service.getAreass(this.id).subscribe((response:any)=>{
     this.area = response.area;
     console.log(response);
   }
   );
   console.log(this.area);
 } */

  /*this.dimension = await this.service.getDimension(this.id).subscribe((response:any)=>{
    this.dimension = response.dimension;
    console.log(response);
  }
  );
  console.log(this.dimension);

this.pei = this.service.getPEI_Id(this.id).subscribe((response:any)=>{
  this.pei = response.pei;
  console.log(response);
}
);
console.log(this.pei);
*/

  toList() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.idPoa,this.idInsti,this.idDepto,this.idUE]);
  }
  toTareas() {
    this.router.navigate(['/gestion_poa/tareas/list/', this.id,this.idPoa,this.idInsti,this.idDepto]);
  }
  toUpdate() {
    this.router.navigate(['/gestion_poa/actividad/update/', this.id,this.idPoa,this.idInsti,this.idDepto]);
  }

  toTab(){
    this.router.navigate(['/gestion_poa/actividad/tab/', this.id,this.idPoa,this.idDepto,this.idInsti]);
  }

  async Delete() {
    try {
      await this.service.eliminarActividad(this.id).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado con éxito!',
          showConfirmButton: false,
          timer: 1000
        })
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
      this.toList();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(function () {
        window.location.reload();
      }, 1000);

    }
  }
}