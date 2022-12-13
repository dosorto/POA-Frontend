
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../..//interfaces-poa/depto.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";
import { Pei } from 'src/app/modules/gestion-pei-module/interfaces-pei/pei.model';
import { Resultado } from 'src/app/modules/gestion-pei-module/interfaces-pei/resultado.model';
import { PeiService } from 'src/app/modules/gestion-pei-module/services-pei/pei.service';
import { ResultadosService } from 'src/app/modules/gestion-pei-module/services-pei/resultados.service';
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
    private peiService:PeiService,
    private ResultadosService:ResultadosService,
    private router: Router,
    private _route: ActivatedRoute) { }
    listaEmpleados: Array<Empleado >=[];
    
    empleado_seleccionado:string="";
    public pei_seleccionado:string="";

    ngOnInit(): void {
      this.initData();
    }async initData(){
      const poas = await firstValueFrom(this.service.getPoas());
      this.poaList = poas;


      this.PeiList = await firstValueFrom(this.peiService.MostrarPei(this.idInsti));
      console.log(this.PeiList);
      this.resultadoList = await firstValueFrom(this.ResultadosService.MostrarResultado(this.idPei));
      console.log(this.PeiList);
      
      console.log(this.resultadoList);
      const Empleados = await firstValueFrom(this.service.getEmpleados());
      this.listaEmpleados = Empleados;
      console.log(this.listaEmpleados)
      console.log(this.poaList)
      console.log(this.resultadoList)
      console.log("hola ", this.pei_seleccionado)


    }
    public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));

  

    public idPoa:number = Number(this._route.snapshot.paramMap.get('idPoa'));
    public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
    public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
    public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
    public UEList: Array<UnidadEjecutora> = [];
    public poaList: Array<Poa> = [];
    

    public resultado_seleccionado:number=this.idPei;
    public PeiList:Array<Pei> = [];
    public resultadoList:Array<Resultado> = [];
    
    public DeptoList: Array<Depto> = []; 
    public InstitucionesList: Array<Institucion> = [];
    public poaSeleccionado: number = this.idPoa;


    selectPoa() {
      this.router.navigate(['/gestion_poa/actividad/list/', this.poaSeleccionado, this.idInsti, this.idDepto,this.idUE]);
      setTimeout(function () {
        window.location.reload();
      }, 10)
    }
  
    toList() {
    this.router.navigate(['/gestion_poa/actividad/list/', this.idPoa,this.idInsti,this.idDepto,this.idUE]);
  }
  
  selectPei(){
    this.router.navigate(['/gestion_pei/dimension/list/',this.pei_seleccionado,this.idInsti]);
    setTimeout(function () {
    }, 10)
  }
  async crearArea(nombre: string, descripcion: string, tipoActividad: string, categoria: string) {
    console.log(nombre.toString(), this.idPoa);
    await this.service.crearActividad(nombre, descripcion, tipoActividad, categoria, this.idPoa,this.selectedEncargadosIds,this.resultado_seleccionado).subscribe((res: any) => {
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
