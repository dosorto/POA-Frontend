import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

import { PoaService } from '../../../services-poa/poa.service';

import { Poa } from '../../../interfaces-poa/poa.model';
import { Depto } from "../../../interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../..//interfaces-poa/unidad_ejecutora.model";

import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ThemePalette} from '@angular/material/core';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';
import { UePresupuestoModel } from '../../../interfaces-poa/ue_presupuesto.model';

@Component({
  selector: 'app-update-poa',
  templateUrl: './update-poa.component.html',
  styleUrls: ['./update-poa.component.css'],
})
export class UpdatePoaComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  user: any;
  
  constructor(private Storage: Storage,
    private ueService: UePresupuesto,
    private service: PoaService,
    private router: Router,
    private poaService: PoaService,
    private _route: ActivatedRoute) { }

  public UePresupesto:UePresupuestoModel | any;
  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public anio_url: any = this._route.snapshot.paramMap.get('anio');
  public ue: UnidadEjecutora | any = {};
  public poa: Poa | any = {};
  public depto: Depto | any = {};
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public name: string = '';
  public anio: string = '';
  public fuente11: number = 0;
  public fuente12: number = 0;
  public fuente12B: number = 0;
  public isActive: boolean = true;

  ngOnInit(): void {
    this.initData();
    console.log(this.initData)
    this.depto = this.service.getDepto_Id(this.idDepto).subscribe((response: any) => {
      this.depto = response.all_deptos;
    })
    this.user = this.Storage.get_storage('user');
    
  }

  async initData() {
    this.poa = await this.service.getPOA_Id(this.id).subscribe((response: any) => {
      this.poa = response.poa;
      this.isActive=response.poa.isActive;
      console.log(response);
    }
    
    );
    await this.ueService.getPresupuestoforUE(this.user.empleado.ejecutora.id,this.anio_url).subscribe(
      (response:any)=>{
        this.UePresupesto = response;
        console.log(response)
      }
      
    )
    console.log(this.poa)
  }

  toDetail(idPoa: number) {
    console.log(this.idDepto)
    this.router.navigate(['/gestion_poa']);
  }

  toList() {
    this.router.navigate(['/gestion_poa/poa/list/', this.poa?.idInsti, this.idUE, this.idDepto]); //revisar
  }

  async Delete() {
    try {
      await this.service.eliminarPOA(this.id).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Dehabilitado con éxito!',
          showConfirmButton: false,
          timer: 1000
        })
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(function () {
        window.location.reload();
      }, 1000);

    }
  }


  async Activate() {
    try {
      await this.service.activarPOA(this.id).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Activado con éxito!',
          showConfirmButton: false,
          timer: 1000
        })
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(function () {
        window.location.reload();
      }, 1000);

    }
  }


  Update(): any {
    let name = this.name;
    let anio = this.anio;
    let fuente11 = this.fuente11;
    let fuente12 = this.fuente12;
    let fuente12B = this.fuente12B;
    let isActive = this.isActive;

    console.log(":" + name + ":" + ":" + anio + ":" + fuente11 + ":" + fuente12 + ":" + fuente12B + ":" + isActive);
    // validaciones
    if ((name === '')) { name = this.poa.name }
    if ((anio === '')) { anio = this.poa.anio }
    if ((fuente11 === 0)) { fuente11 = this.poa.fuente11 }
    if ((fuente12 === 0)) { fuente12 = this.poa.fuente12 }
    if ((fuente12B === 0)) { fuente12B = this.poa.fuente12B }
    
    console.log(":" + name + ":" + ":" + anio + ":" + fuente11 + ":" + fuente12 + ":" + fuente12B  + ":" + isActive);
    try {
      this.service.updatePOA(name,anio,fuente11.toString(),fuente12.toString(),fuente12B.toString(),this.id,this.isActive,this.idInsti,this.idUE,this.idDepto).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado con éxito!',
          showConfirmButton: false,
          timer: 2500
        })
       },(error:any)=>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: false,
          timer: 2500
        })
       });
       setTimeout(function() {
        window.location.reload();
      },1000);
      this.toDetail(this.id);
    } catch (error) {
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  }

}
