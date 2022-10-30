import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pei-create',
  templateUrl: './pei-create.component.html',
  styleUrls: ['./pei-create.component.css']
})
export class PeiCreateComponent implements OnInit {
  
  constructor(private Storage: Storage, private service: PeiService, private router:Router) { }

  ngOnInit(): void {
  }
  async crear_pei(name: string, initialYear: string, finalYear: string, idInstitucion: number) {
    await this.service.crearPEI(name, initialYear, finalYear, idInstitucion ).subscribe((res: any) => {
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
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }


}
