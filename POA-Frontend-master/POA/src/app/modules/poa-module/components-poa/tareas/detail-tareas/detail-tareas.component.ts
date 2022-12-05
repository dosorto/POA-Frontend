import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { TareasService } from '../../../services-poa/tareas.service';

import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { Presupuesto } from '../../../interfaces-poa/presupuesto.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-detail-tareas',
  templateUrl: './detail-tareas.component.html',
  styleUrls: ['./detail-tareas.component.css']
})
export class DetailTareasComponent implements OnInit {

  color: ThemePalette = 'primary';
  isPresupueseto = false;
  checked = true;
  disabled = true;
  isPresupuesto: boolean = true;
  _delete: any;
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tareaservice:TareasService) { }

    //public listTareas : Array<Tareas>=[];
    public listPresupuesto: Array<Presupuesto>=[];

    id = Number(this.route.snapshot.paramMap.get('id'));
    idActividad:number = Number(this.route.snapshot.paramMap.get('idActividad'));
  //idPresupuesto:number = Number(this.route.snapshot.paramMap.get('idPresupuesto'));
  
  public tareas: Tareas | any = {};
  public presupuesto: Presupuesto | any = {};
  public actividad: Actividad | any = {};

  ngOnInit(): void {
    if (this.id) {
      this.getTareass(this.id);
    }
  }

  getTareass(id: number): void {
    this.tareaservice.getTareas(id).subscribe({
      next: tareas => { this.tareas = tareas }
      // error: err => this.errorMessage = err
    });
  }
  async initData() {
    // const tareas = await firstValueFrom(this.tareaservice.getTarea(this.idActividad))
    // this.listTareas = tareas;

    // const presupuesto = await firstValueFrom(this.tareaservice.getPresupuesto(this.id))
    // this.listPresupuesto = presupuesto;


    this.tareas = await this.tareaservice.getTareas(this.id).subscribe((response: any) => {
      this.tareas = response.tareas;
      console.log(response);
    }
      )
      
      console.log(this.tareas)
      

  }

  toList() {
    this.router.navigate(['/gestion_poa/tareas/list/', this.idActividad]); //revisar
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
  onBack(): void {
    this.router.navigate(['/gestion_poa/tareas/list/', this.idActividad]);
    
  }
  toUpdate(){
    this.router.navigate(['/gestion_poa/tareas/update/',this.id,this.idActividad]);
  }

  set_id_delete(id: any) {
    this._delete = id;
    console.log(this._delete)
  }

  async delete() {

    await this.tareaservice.eliminarTarea(this._delete)
    Swal.fire({
      title: 'Eliminado con exito',
      showConfirmButton: false,
      color: 'white',
      background: '#F5B7B1',
      timer: 300,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }

    })
    this.onBack();
    // setTimeout(function() {
    //   window.location.reload();
    // },3000);
    // setTimeout(function () {
    //   window.location.reload();
    // }, 100);

    // window.location.reload();

  }

  // window.location.reload();
}
  

