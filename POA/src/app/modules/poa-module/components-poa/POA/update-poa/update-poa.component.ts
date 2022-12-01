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


@Component({
  selector: 'app-update-poa',
  templateUrl: './update-poa.component.html',
  styleUrls: ['./update-poa.component.css'],
})
export class UpdatePoaComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  
  constructor(private Storage: Storage,
    private service: PoaService,
    private router: Router,
    private poaService: PoaService,
    private _route: ActivatedRoute) { }

  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public ue: UnidadEjecutora | any = {};
  public poa: Poa | any = {};
  public depto: Depto | any = {};
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public name: string = '';
  public anio: string = '';
  public fuente11: string = '';
  public fuente12: string = '';
  public fuente12B: string = '';

  ngOnInit(): void {
    this.initData();
    console.log(this.initData)
    this.depto = this.service.getDepto_Id(this.idDepto).subscribe((response: any) => {
      this.depto = response.depto;
    });
  }

  async initData() {
    this.poa = await this.service.getPOA_Id(this.id).subscribe((response: any) => {
      this.poa = response.poa;
      console.log(response);
    }
    );
    console.log(this.poa)
  }

  toDetail(idPoa: number) {
    console.log(this.idDepto)
    this.router.navigate(['/gestion_poa/poa/detail/', idPoa.toString(), this.idInsti, this.idUE, this.idDepto]);
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

    console.log(":" + name + ":" + ":" + anio + ":" + fuente11 + ":" + fuente12 + ":" + fuente12B);
    // validaciones
    if ((name === '')) { name = this.poa.name }
    if ((anio === '')) { anio = this.poa.anio }
    if ((fuente11 === '')) { fuente11 = this.poa.fuente11 }
    if ((fuente12 === '')) { fuente12 = this.poa.fuente12 }
    if ((fuente12B === '')) { fuente12B = this.poa.fuente12B }

    console.log(":" + name + ":" + ":" + anio + ":" + fuente11 + ":" + fuente12 + ":" + fuente12B);
    try {
      this.service.updatePOA(name,anio,fuente11,fuente12,fuente12B,this.id,this.idInsti,this.idUE,this.idDepto).subscribe((res:any)=>{
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
       this.toDetail(this.id);
    } catch (error) {
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  }

}
