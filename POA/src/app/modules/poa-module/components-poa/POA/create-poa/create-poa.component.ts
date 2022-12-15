import { Component, OnInit } from '@angular/core';

import { PoaService } from '../../../services-poa/poa.service';
import { Depto } from "../../../interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../../interfaces-poa/unidad_ejecutora.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  selector: 'app-create-poa',
  templateUrl: './create-poa.component.html',
  styleUrls: ['./create-poa.component.css']
})
export class CreatePoaComponent implements OnInit {
  public UePresupesto: any;
  user: any;
  onChange(result: Date): void {
    this.date = result;
  }
  

  constructor(private PoaService: PoaService, 
              private ueService: UePresupuesto,
              private _route: ActivatedRoute, 
              private router: Router,
              private i18n: NzI18nService,
              private Storage:Storage) { }

  ngOnInit(): void {
    this.user = this.Storage.get_storage('user');
    this.initData();
  }
  public date:Date = new Date('Tue Dec 14 2024 06:48:15 GMT-0600 (CST)') ;
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idPresupuesto: number = Number(this._route.snapshot.paramMap.get('idPresupuesto'));
  public anio: any = this._route.snapshot.paramMap.get('anio');
  public departamento: Depto | any = {};

  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public ue: UnidadEjecutora | any = {};

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public insti: Institucion | any = {};

  public InstitucionesList: Array<Institucion> = [];

  async initData() {
    this.departamento = await this.PoaService.getDepto_Id(this.idDepto).subscribe((response: any) => {
      this.departamento = response.all_deptos;
    })
    await this.ueService.getPresupuestoforUE(this.user.empleado.ejecutora.id,this.anio).subscribe(
      (response:any)=>{
        this.UePresupesto = response;
        console.log(response)
      }
      
    )
  }

  toList() {
    this.router.navigate(['gestion_poa/poa/list/', this.idInsti, this.idUE, this.idDepto,this.idPresupuesto]);
  }

  async crear_poa(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string) {
    console.log(name, this.date.getFullYear().toString(), fuente11, fuente12, fuente12B, this.idDepto, this.idUE, this.idInsti);
    try {
      await this.PoaService.crearPOA(name, this.anio, fuente11, fuente12, fuente12B, this.idDepto, this.idUE, this.idInsti).subscribe((res: any) => {
        console.log(res);
      });
      Swal.fire({
        icon: 'success',
        title: '¡Registrado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.toList()
  }

  onBack(): void {
    this.router.navigate(['/gestion_poa']);
  }

}
