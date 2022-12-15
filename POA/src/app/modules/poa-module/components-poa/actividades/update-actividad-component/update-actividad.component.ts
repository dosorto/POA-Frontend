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
import { ResultadosService } from 'src/app/modules/gestion-pei-module/services-pei/resultados.service';


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
    private ResultadosService:ResultadosService,
    private router: Router,
    private _route: ActivatedRoute) { }

  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public UEList: Array<UnidadEjecutora> = [];
  public poaList: Array<Poa> = [];
  public actividadList: Array<Actividad> = [];
  public actividadList2: Array<Actividad> = [];
  public DeptoList: Array<Depto> = [];
  public InstitucionesList: Array<Institucion> = [];
  actividad: Actividad | any = {};
  errorMessage = '';
  resultado: Resultado | any = {};
  public nombre: string = '';
  public nombre1: string = '';
  public descripcion: string = '';
  public tipoActividad: string = '';
  public estado: string = '';
  public categoria: string = '';
  public actividad1: Actividad | any = {};
  public poaSeleccionado: number = this.idPoa;
  public actividadSeleccionada: number = this.id;
  public tareass:Resultado | any = {};
  public tipoActividad1: string = this.actividad1.tipoActividad ;
  public categoria1: string= '';
  public idPei1:any;
  public listResultado: Array<Resultado>=[];

  async mostrarObjeto2 (nombre:string) {
    this.tareass = await this.ResultadosService.Probando(this.nombre).subscribe((response:any)=>{
      this.tareass = response.resultado;
      this.idPei1 = response?.resultado?.id;
    })

  }




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
      next: actividad => { this.actividad = actividad },
      error: err => this.errorMessage = err
    });
  }

  async initData() {
    const poas = await firstValueFrom(this.service.getPoas());
    this.poaList = poas;



    const actividades = await firstValueFrom(this.service.getActividadesss());
    this.actividadList = actividades;

    console.log(this.actividad);
    console.log("hoka", this.id)

    this.actividad1 = this.service.getActividad(this.id).subscribe((response: any) => {
      this.actividad1 = response.actividad;
      this.tipoActividad1 = this.actividad1.tipoActividad;
      this.categoria1 = this.actividad1.categoria;
    });

    const tareasH = await firstValueFrom(this.ResultadosService.getResultado2())
    this.listResultado = tareasH;

    this.resultado = await this.ResultadosService.getResultadoss(this.id).subscribe((response:any)=>{
      this.resultado = response.resultado;
      console.log(response);
      });
     
  }
  toDetail() {
    this.router.navigate(['/gestion_poa/actividad/detail/', this.id, this.idPoa, this.idInsti, this.idDepto]);
  }

  toList() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.idPoa, this.idInsti, this.idDepto, this.idUE]);
  }


  update() {
    let nombre1=this.nombre1;
    let nombre = this.nombre;
    let descripcion = this.descripcion;
    let tipoActividad = this.tipo_seleccionado;
    let categoria = this.categoria_seleccionado;

    // validaciones
    if ((nombre1 === '')) { nombre1 = this.actividad.nombre }
  //  if ((nombre === '')) { nombre = this.actividad.nombre }
    if ((descripcion === '')) { descripcion = this.actividad.descripcion }
    if ((tipoActividad === '')) { tipoActividad = this.actividad.tipoActividad }
    if ((categoria === '')) { categoria = this.actividad.categoria }


    try {
      this.service.updateActividad(this.id, nombre1, descripcion, tipoActividad, categoria, this.idPoa,this.idPei1 ).subscribe((res: any) => {
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

