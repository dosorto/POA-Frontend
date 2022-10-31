import { Component, OnInit } from '@angular/core';
import { PeiService } from '../../../services-pei/pei.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pei-create',
  templateUrl: './pei-create.component.html',
  styleUrls: ['./pei-create.component.css']
})
export class PeiCreateComponent implements OnInit {

  constructor(private PeiService: PeiService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.initData()
    //this.initData_Institucion()
  }

  public pei: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    initialYear: new FormControl('', [Validators.required]),
    finalYear: new FormControl('', [Validators.required]),
    idInstitucion: new FormControl('', [Validators.required])
  })

  async crear_pei(name: string, initialYear: string, finalYear: string) {
    await this.PeiService.crearPEI(name, initialYear, finalYear).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Registrado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
    }, (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    this.onBack()
  }
  onBack(): void {
    this._router.navigate(['/gestion_pei/pei/list/idInsti']);
  }

}
