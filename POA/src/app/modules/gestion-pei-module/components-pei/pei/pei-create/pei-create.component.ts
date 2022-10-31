import { Component, OnInit } from '@angular/core';
import { PeiService } from '../../../services-pei/pei.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pei-create',
  templateUrl: './pei-create.component.html',
  styleUrls: ['./pei-create.component.css']
})
export class PeiCreateComponent implements OnInit {

  constructor(private Storage: Storage, private PeiService: PeiService, private _route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
  }

  public idInstitucion: number = Number(this._route.snapshot.paramMap.get('idInstitucion'));
  toList() {
    this.router.navigate(['/gestion_pei/pei/list/', this.idInstitucion]);
  }

  async crear_pei(name: string, initialYear: string, finalYear: string) {
    console.log(name.toString(), initialYear, finalYear, this.idInstitucion);
    await this.PeiService.crearPEI(name, initialYear, finalYear, this.idInstitucion).subscribe((res: any) => {
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
    //this.onBack()
  }
  //onBack(): void {
    //this._route.navigate(['/gestion_pei/pei/list/idInsti']);
  //}

}
