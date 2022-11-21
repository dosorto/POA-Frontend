import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Area } from 'src/app/modules/gestion-pei-module/interfaces-pei/area.model';
import { Pei } from 'src/app/modules/gestion-pei-module/interfaces-pei/pei.model'
import { Objetivo } from 'src/app/modules/gestion-pei-module/interfaces-pei/objetivo.model';

import { Dimension } from 'src/app/modules/gestion-pei-module/interfaces-pei/dimension.model';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Resultado } from 'src/app/modules/gestion-pei-module/interfaces-pei/resultado.model';
@Component({
  selector: 'app-detail-actividad-component',
  templateUrl: './detail-actividad-component.component.html',
  styleUrls: ['./detail-actividad-component.component.css']
})
export class DetailActividadComponent implements OnInit {
  public idObjetivo: number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
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
    this.router.navigate(['/gestion_poa/actividad/list/', this.idObjetivo]);
  }
  toResultados() {
    this.router.navigate(['/gestion_pei/resultados/list/', this.id]);
  }
  toUpdate() {
    this.router.navigate(['/gestion_poa/actividad/update/', this.id, this.idObjetivo]);
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