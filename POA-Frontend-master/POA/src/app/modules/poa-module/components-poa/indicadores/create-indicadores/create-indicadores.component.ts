import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Indicadores } from '../../../interfaces-poa/Indicadores.model'; 
import { IndicadorService } from '../../../services-poa/indicador.service';  
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Poa } from '../../../interfaces-poa/poa.model';

@Component({
  selector: 'app-create-indicadores',
  templateUrl: './create-indicadores.component.html',
  styleUrls: ['./create-indicadores.component.css']
})
export class CreateIndicadoresComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  public indicadores : Indicadores | any = {};

  constructor(private serviceIndicares:IndicadorService,
            
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public indicadorSeguimiento :Indicadores | any = {};
  //public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
  //public idDepto = Number(this.route.snapshot.paramMap.get('idDpeto'));
  //public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
  //public idActividades = Number(this.route.snapshot.paramMap.get('idActividad'));
  public idActividad = 1;
  public idDepto = 1;
  public idPoa = 1;
  public idInsti =1;

  public ActividadList: Actividad | any = {};

  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {};

  public isPorcentaje:Boolean =false;
  public isCantidad:Boolean = false;

  showData(): any {
    if(this.isPorcentaje = true){
      this.isCantidad = false;
    }
    
  }

  showData1(): any {
    if(this.isCantidad = true){
     this.isPorcentaje = false;
    }
  }


  async initData(){
  
    this.InstiList = await this.serviceIndicares.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.InstiList = response.Institucion;
    })

    this.DeptoList = await this.serviceIndicares.getDepto_Id(this.idDepto).subscribe((response:any)=>{
      this.DeptoList = response.departamento;
    })

    this.PoaList = await this.serviceIndicares.getPoa_Id(this.idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
    })

    this.ActividadList = await this.serviceIndicares.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.ActividadList = response.actividad;
    })

  }


  toList(){
    this.router.navigate(['/gestion_poa/indicadores/list/',this.idActividad,this.idPoa,this.idDepto,this.idInsti]); //revisar
  }
  

  async crear_Indicador(nombre:string,descripcion:string, cantidadPlanificada:number,isCantidad:boolean,isPorcentaje:boolean ){
    // console.log(nombre.toString(),descripcion,this.idPei);
    if(isPorcentaje){
      await this.serviceIndicares.crearIndicador(nombre,descripcion,cantidadPlanificada,isCantidad,isPorcentaje,this.idActividad).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: '¡Creado con éxito!',
          showConfirmButton: false,
          timer: 2500
        })
        this.toList();
      },(error:any)=>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: false,
          timer: 2500
        })
      });
    } if (this.isCantidad) {
      await this.serviceIndicares.crearIndicador(nombre,descripcion,cantidadPlanificada,isCantidad,isPorcentaje,this.idActividad).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: '¡Creado con éxito!',
          showConfirmButton: false,
          timer: 2500
        })
        //  this.toList();
      },(error:any)=>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: false,
          timer: 2500
        })
      });
    }
    
    
  }

}
