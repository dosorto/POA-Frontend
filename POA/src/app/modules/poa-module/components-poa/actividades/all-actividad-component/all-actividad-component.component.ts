import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Area } from 'src/app/modules/gestion-pei-module/interfaces-pei/area.model';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";
import { Pei } from 'src/app/modules/gestion-pei-module/interfaces-pei/pei.model';
import { Resultado } from 'src/app/modules/gestion-pei-module/interfaces-pei/resultado.model';
import { PeiService } from 'src/app/modules/gestion-pei-module/services-pei/pei.service';
import { ResultadosService } from 'src/app/modules/gestion-pei-module/services-pei/resultados.service';

@Component({
  selector: 'app-all-actividad-component',
  templateUrl: './all-actividad-component.component.html',
  styleUrls: ['./all-actividad-component.component.css']
})
export class AllActividadComponent implements OnInit {
  constructor(
    private Storage: Storage,
    private service: ActividadService,
    private peiService:PeiService,
    private ResultadosService:ResultadosService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  public idPoa: number = Number(this._route.snapshot.paramMap.get('idPoa'));
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));

  public poaList: Array<Poa> = [];
  public UEList: Array<UnidadEjecutora> = [];
  public DeptoList: Array<Depto> = [];
  public InstitucionesList: Array<Institucion> = [];

  public depto: Depto | any = {};
  public poa: Poa | any = {};
  public insti: Institucion | any = {};
  public Unidad: UnidadEjecutora | any = {};

  public poaSeleccionado: number = this.idPoa;
  private area_example: Area | any = {};
  public actividades: Array<Actividad> = []; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Area | any = this.area_example; // define datos de un elemento a actualizar
  public pei_seleccionado:string = "";
  public PeiList:Array<Pei> = [];

  public page: number = 0;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []

  // metodos propios
  async initData() {
    // obtiene todas las dimensiones
    const actividades = await firstValueFrom(this.service.getActividades(this.idPoa));
    this.actividades = actividades;
    const poas = await firstValueFrom(this.service.getPoas());
    this.poaList = poas;
    const departamentos = await firstValueFrom(this.service.getdepartamentos());
    this.DeptoList = departamentos;
    const instituciones = await firstValueFrom(this.service.getInstituciones());
    this.InstitucionesList = instituciones;

    this.PeiList = await firstValueFrom(this.peiService.MostrarPei(this.idInsti));
//console.log(this.DeptoList);
       console.log(this.depto);
       console.log(this.insti);

    this.poa = await this.service.getPoa_Id(this.idPoa).subscribe((response: any) => {
      this.poa = response.poa;
    })
    this.insti = await this.service.getInsti_Id(this.idInsti).subscribe((response: any) => {
      this.insti = response.Institucion;
    })
    this.depto = await this.service.getDepto_Id(this.idDepto).subscribe((response: any) => {
      this.depto = response.all_deptos;
    
    })


    
    

   


    // sirve para definir un maximo de paginas en paginacion de tablas
    this.maxPages = ((this.actividades.length % this.step) === 0) ? Math.floor(this.actividades.length / this.step) : (Math.floor(this.actividades.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages + 1);
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idActividad: number) {
    this.router.navigate(['/gestion_poa/actividad/detail/', idActividad.toString(), this.idPoa, this.idInsti, this.idDepto]);
  }
  toCreate() {
    this.router.navigate(['/gestion_poa/actividad/create/', this.idPoa.toString(), this.idInsti, this.idDepto, this.pei_seleccionado]);
  }
  toHome() {
    this.router.navigate(['/home']);
  }
  toPoa(){
    this.router.navigate(['/gestion_poa/poa/list/',this.idInsti,this.idUE,this.idDepto]);
  }
  selectPoa() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.poaSeleccionado, this.idInsti, this.idDepto,this.idUE]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
  
  selectPei(){
    this.router.navigate(['/gestion_poa/actividad/list/',this.poaSeleccionado, this.idInsti, this.idDepto,this.idUE]);
    setTimeout(function () {
    }, 10)
  }

  nextPage() {
    this.page = this.page + this.step;
    console.log(this.page)
  }
  previousPage() {
    this.page = this.page - this.step;
    console.log(this.page)
  }
  selectPage(numPage: number) {
    this.page = numPage * this.step;
  }

  set_id_delete(nombre: string) {
    this._delete = nombre;
    console.log(this._delete)
  }
}
