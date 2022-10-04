import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { peiService } from './pei.service';
import { peiModel } from "./pei.model";
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pei',
  templateUrl: './pei.component.html',
  styleUrls: ['./pei.component.css']
})

export class GestionPeiComponent implements OnInit {
  rutaActual = "pei";
  peis: Array<peiModel.Pei> = [];
  user = this.Storage.get_storage("user");
  _delete: string = "";
  data_update: Array<string> = [];

  constructor(private Storage: Storage, private service: peiService) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData() {
    let peis = await firstValueFrom(this.service.getPEI())
    this.peis = peis;
  }
  set_id_delete(name: string) {
    this._delete = name;
    console.log(this._delete)
  }
  async delete() {
    await this.service.eliminarPEI(this._delete);
    window.location.reload();
  }
  async crear_pei(name: string, initialYear: string, finalYear: string) {
    await this.service.crearPEI(name, initialYear, finalYear).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡PEI registrado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },3000);
    }, (error: any) => {
      console.log(error);
    });
  }

  set_update(index: number) {
    const peiToUpdate = this.peis[index]
    this.data_update = [peiToUpdate.name, peiToUpdate.initialYear, peiToUpdate.finalYear, peiToUpdate.id];
  };

  update(name: string, initialYear: string, finalYear: string) {
    console.log("entra a la funcion")
    const id = this.data_update[2]; // ahi se aloja el id
    // validaciones
    if ((name === '')) { name = this.data_update[0] }
    if ((initialYear === '')) { initialYear = this.data_update[1] }
    if ((finalYear === '')) { finalYear = this.data_update[2] }
    try {
      this.service.actualizarPEI(name, initialYear, finalYear, parseInt(id)).subscribe((res: any) => {
        console.log(res);

      }, (error: any) => {
        console.log(error);
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}

