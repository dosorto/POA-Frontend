import { Component, OnInit } from '@angular/core';
import { PeiService } from '../../../services-pei/pei.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';

@Component({
  selector: 'app-pei-create',
  templateUrl: './pei-create.component.html',
  styleUrls: ['./pei-create.component.css']
})
export class PeiCreateComponent implements OnInit {

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public insti: Institucion | any = {};

  constructor(private PeiService: PeiService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  public idInstitucion: number = Number(this._route.snapshot.paramMap.get('idInsti'));

  async initData() {
    this.insti = this.PeiService.getInsti_Id(this.idInsti).subscribe((response: any) => {
      this.insti = response.Institucion;
    });
  }



  toList() {
    this.router.navigate(['gestion_pei/pei/list/', this.idInstitucion]);
  }

  async crear_pei(name: string, initialYear: string, finalYear: string) {
    console.log(name, initialYear, finalYear, this.idInstitucion);
    await this.PeiService.crearPEI(name, initialYear, finalYear, this.idInstitucion).subscribe((res: any) => {
      console.log(res);
      if (initialYear < finalYear) {
        Swal.fire({
          icon: 'success',
          title: '¡Registrado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.onBack()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },);

  }
  onBack(): void {
    this.router.navigate(['/gestion_pei/pei/list/', this.idInstitucion]);
  }

}
