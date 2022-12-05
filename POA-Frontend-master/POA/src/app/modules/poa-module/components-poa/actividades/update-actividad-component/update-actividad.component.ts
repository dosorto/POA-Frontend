import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { ActividadService } from '../../../services-poa/actividad.service';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Resultado } from 'src/app/modules/gestion-pei-module/interfaces-pei/resultado.model';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";


@Component({
  selector: 'app-update-actividad',
  templateUrl: './update-actividad.component.html',
  styleUrls: ['./update-actividad.component.css']
})
export class UpdateActividadComponent implements OnInit {
  estado_seleccionado: string = "";
  tipo_seleccionado: string = "";
  categoria_seleccionado: string = "";


  constructor(private Storage: Storage,
    private service: ActividadService,
    private router: Router,
    private _route: ActivatedRoute) { }

  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idPoa:number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public UEList: Array<UnidadEjecutora> = [];
  public poaList: Array<Poa> = [];
  public DeptoList: Array<Depto> = []; 
  public InstitucionesList: Array<Institucion> = [];
  actividad: Actividad | any = {};
  errorMessage = '';
  public nombre: string = '';
  public descripcion: string = '';
  public tipoActividad: string = '';
  public estado: string = '';
  public categoria: string = '';


  ngOnInit(): void {
    this.initData();

    const id = Number(this._route.snapshot.paramMap.get('id'));
    if (id) {
      this.getActividades(id);  
    }
    console.log(this.actividad?.id)
  }
  getActividades(id: number): void {
    this.service.getActividadess(id).subscribe({
      next: actividad => {this.actividad = actividad},
      error: err => this.errorMessage = err
    });
  }

  async initData(){
    this.actividad = await this.service.getActividad(this.id).subscribe((response:any)=>{
      this.actividad = response.actividad;
      console.log(response);
    }
    );
    console.log(this.actividad);
  }
  toDetail(){
    this.router.navigate(['/gestion_poa/actividad/detail/',this.id,this.idPoa,this.idInsti,this.idDepto]);
  }

  toList() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.idPoa,this.idInsti,this.idDepto,this.idUE]);
  }


  update() {
    let nombre = this.nombre;
    let descripcion = this.descripcion;
    let estado = this.estado_seleccionado;
    let tipoActividad = this.tipo_seleccionado;
    let categoria = this.categoria_seleccionado;

    // validaciones
    if ((nombre === '')) { nombre = this.actividad.nombre}
    if ((descripcion === '')) { descripcion = this.actividad.descripcion}
    if ((estado === '')) { estado = this.actividad.estado}
    if ((tipoActividad === '')) { tipoActividad = this.actividad.tipoActividad}
    if ((categoria === '')) { categoria = this.actividad.categoria}

    
    try {
      this.service.updateActividad(this.id,nombre,descripcion,estado,tipoActividad,categoria, this.idPoa).subscribe((res: any) => {
        console.log(res);

      }, (error: any) => {
        console.log(error);
      });  
      Swal.fire({
        icon: 'success',
        title: '¡Actividad actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function () {
     //   window.location.reload();
        
      }, 2500);
      this.toList();
    } catch (error) {
      console.log(error);
    }
  }


}

