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
  isPresupueseto=false;
  checked = true;
  disabled = true;
  

  isPresupuesto:boolean=true;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tareaservice:TareasService) { }

    //public listTareas : Array<Tareas>=[];
    public listPresupuesto: Array<Presupuesto>=[];

    id = Number(this.route.snapshot.paramMap.get('id'));
    idActividad:number = Number(this.route.snapshot.paramMap.get('idActividad'));
  //idPresupuesto:number = Number(this.route.snapshot.paramMap.get('idPresupuesto'));
  public tareas:Tareas | any = {};

  public presupuesto:Presupuesto|any={};
  public actividad:Actividad|any={};

  ngOnInit(): void {
    if (this.id) {
      this.getTareass(this.id);  
    }
  }

  getTareass(id: number): void {
    this.tareaservice.getTareas(id).subscribe({
      next: tareas => {this.tareas = tareas}
      // error: err => this.errorMessage = err
    });
  }
  async initData(){
    // const tareas = await firstValueFrom(this.tareaservice.getTarea(this.idActividad))
    // this.listTareas = tareas;

    // const presupuesto = await firstValueFrom(this.tareaservice.getPresupuesto(this.id))
    // this.listPresupuesto = presupuesto;

    
    this.tareas = await this.tareaservice.getTareas(this.id).subscribe((response:any)=>{
      this.tareas = response.tareas;
      console.log("tamos bien1")
      console.log(response);
    }
      )
      console.log("tamos bien2")
      console.log(this.tareas)
      console.log("tamos bien3")

  }

  toList(){
    this.router.navigate(['/gestion_poa/tareas/list/',this.idActividad]); //revisar
  }
  
}
