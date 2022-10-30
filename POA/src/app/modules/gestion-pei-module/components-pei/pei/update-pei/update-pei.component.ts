import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-pei',
  templateUrl: './update-pei.component.html',
  styleUrls: ['./update-pei.component.css']
})
export class UpdatePeiComponent implements OnInit {

  private pei_example: Pei = {
    id: 0,
    name: '',
    initialYear: new Date(),
    finalYear: new Date(),
    idInstitucion: 0,
    isDelete: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  rutaActual = "pei";
  public peis: Array<Pei> = [];
  public user = this.Storage.get_storage("user");
  token = this.user.token;
  public filter: string = "";
  public _delete: string = "";
  public data_update: Pei = this.pei_example;


  constructor(private Storage: Storage, private service: PeiService, private router:Router) { }

  ngOnInit(): void {
  }

  set_update(_peis: Pei) {
    this.data_update = _peis
  };

  update(name: string, initialYear: Date, finalYear: Date, idInstitucion: number): any {
    console.log("entra a la funcion")
    const id = this.data_update.id; // ahi se aloja el id
    // validaciones
    if ((name === '')) { name = this.data_update.name }
    if ((initialYear  === new Date())) { initialYear = this.data_update.initialYear }
    if ((finalYear === new Date())) { finalYear = this.data_update.finalYear }
    try {
      this.service.updatePEI(name, initialYear, finalYear, id, idInstitucion).subscribe((res: any) => {
        console.log(res);

      }, (error: any) => {
        console.log(error);
      });
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function () {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.log(error);
    }
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }

}
