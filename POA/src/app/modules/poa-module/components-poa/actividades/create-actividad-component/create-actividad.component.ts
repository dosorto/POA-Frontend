
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Empleado } from '../../../interfaces-poa/empleados.model';
@Component({
  selector: 'app-create-actividad',
  templateUrl: './create-actividad.component.html',
  styleUrls: ['./create-actividad.component.css']
})
export class CreateActividadComponent implements OnInit {
  selectedEncargadosIds: string="";
  estado_seleccionado: string = "";
  tipo_seleccionado: string = "";
  categoria_seleccionado: string = "";

  constructor(private Storage: Storage,
    private service: ActividadService,
    private router: Router,
    private _route: ActivatedRoute) { }
    listaEmpleados: Array<Empleado >=[];
    
    empleado_seleccionado:string="";

    ngOnInit(): void {
      this.initData();
    }async initData(){

      const Empleados = await firstValueFrom(this.service.getEmpleados());
      this.listaEmpleados = Empleados;
      console.log(this.listaEmpleados)

    }
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  toList() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.idPoa]);
  }
  async crearArea(nombre: string, descripcion: string, estado: string, tipoActividad: string, categoria: string) {
    console.log(nombre.toString(), this.idPoa);
    await this.service.crearActividad(nombre, descripcion, estado, tipoActividad, categoria, this.idPoa,this.selectedEncargadosIds).subscribe((res: any) => {
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.toList();
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }
}
