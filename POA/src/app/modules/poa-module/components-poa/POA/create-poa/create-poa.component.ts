import { Component, OnInit } from '@angular/core';

import { PoaService } from '../../../services-poa/poa.service';
import { Depto } from "../../../interfaces-poa/depto.model";
import { UnidadEjecutora } from "../../../interfaces-poa/unidad_ejecutora.model";
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-poa',
  templateUrl: './create-poa.component.html',
  styleUrls: ['./create-poa.component.css']
})
export class CreatePoaComponent implements OnInit {

  constructor(private PoaService: PoaService, private _route: ActivatedRoute, private router: Router) { }


  public idDepto: number = Number(this._route.snapshot.paramMap.get('idDepto'));
  public departamento: Depto | any = {};

  public idUE: number = Number(this._route.snapshot.paramMap.get('idUE'));
  public ue: UnidadEjecutora | any = {};

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public insti: Institucion | any = {};

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.insti = this.PoaService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion;
    });
  }

  toList() {
    this.router.navigate(['gestion_poa/poa/list/', this.idInsti,this.idUE,this.idDepto]);
  }

  async crear_poa(name: string, anio: string, fuente11: string, fuente12: string, fuente12B: string) {
    console.log(name, anio, fuente11, fuente12, fuente12B, this.idDepto, this.idUE, this.idInsti);
    try {
      await this.PoaService.crearPOA(name, anio, fuente11, fuente12, fuente12B, this.idDepto, this.idUE, this.idInsti).subscribe((res: any) => {
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
    this.router.navigate(['/gestion_poa/poa/list/',this.idInsti,this.idUE,this.idDepto]);
  }

}
