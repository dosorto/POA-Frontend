import { Component, OnInit } from '@angular/core';

import { PoaService } from '../../../services-poa/poa.service';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';
import { Depto } from "../../../interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../../interfaces-poa/unidad_ejecutora.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  selector: 'app-create-poa',
  templateUrl: './create-ue-presupuesto.component.html',
  styleUrls: ['./create-ue-presupuesto.component.css']
})
export class CreateUePresupuestoComponent implements OnInit {
  onChange(result: Date): void {
    this.date = result;
  }
  

  constructor(private Storage:Storage,
              private Service: UePresupuesto, 
              private _route: ActivatedRoute, 
              private router: Router,
              private i18n: NzI18nService) { }

  ngOnInit(): void {
    this.initData();
    this.user = this.Storage.get_storage('user');
  }
  //public date:Date = new Date('Tue Dec 14 2024 06:48:15 GMT-0600 (CST)') ;
  public date:any = null;
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public departamento: Depto | any = {};
  public user:any={}; // usuario logueado (no es tipo user, es un json)

  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public ue: UnidadEjecutora | any = {};

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public insti: Institucion | any = {};

  public InstitucionesList: Array<Institucion> = [];

  async initData() {
    
  }

  toList() {
    this.router.navigate(['/gestion_poa']);
  }

  async crear_poa(anio: string, fuente11: string, fuente12: string, fuente12B: string) {
    console.log( this.date.getFullYear().toString(), fuente11, fuente12, fuente12B, this.user.empleado.ejecutora.id);
    try {
      await this.Service.crearUePresupuesto( this.date.getFullYear().toString(), fuente11, fuente12, fuente12B, this.user.empleado.ejecutora.id).subscribe((res: any) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: '¡Registrado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.toList()
      });
      
    } catch(e) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error '+e,
        showConfirmButton: false,
        timer: 1500
      })
      this.toList()
    }
    
  }

  onBack(): void {
    this.router.navigate(['/gestion_poa/poa/list/', this.idInsti, this.idUE, this.idDepto]);
  }

}
