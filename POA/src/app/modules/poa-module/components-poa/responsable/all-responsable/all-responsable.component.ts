import { Component, OnInit } from '@angular/core';
import { ResponsableService } from '../../../services-poa/responsable.service';
import { ActivatedRoute } from '@angular/router';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { ActividadService } from '../../../services-poa/actividad.service';
import { firstValueFrom } from 'rxjs';
import { Empleado } from '../../../interfaces-poa/empleados.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-responsable',
  templateUrl: './all-responsable.component.html',
  styleUrls: ['./all-responsable.component.css']
})
export class AllResponsableComponent implements OnInit {
  public isVisible: BooleanInput = false;
  public listOfEmpleadosFronDB:any;

  constructor(private service:ResponsableService,
              private _route:ActivatedRoute,
              private actividadService:ActividadService) { }

  public idActividad:number = Number(this._route.snapshot.paramMap.get('idActividad'));

  public encargados:any;
  ngOnInit(): void {
    this.initData();
  }

  async initData(){
    this.encargados = this.service.getEncargados(this.idActividad).subscribe(
    (response:any)=>{
      this.encargados = response;
    }
    )
    this.listOfEmpleadosFronDB = await firstValueFrom(this.actividadService.getEmpleados());
  }
  delete(id:number){
    this.service.delete(id).subscribe((response:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado con éxito!',
        showConfirmButton: false,
        timer: 1000
      });
    })
  }
  change(){
    if(this.isVisible){
      this.isVisible = false;
    }else{
      this.isVisible = true;
    }
  }
}
