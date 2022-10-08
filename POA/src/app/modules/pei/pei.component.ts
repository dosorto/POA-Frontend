import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { peiService } from './pei.service';
import { peiModel } from "./pei.model";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pei',
  templateUrl: './pei.component.html',
  styleUrls: ['./pei.component.css']
})

export class GestionPeiComponent implements OnInit {

  private pei_example: peiModel.Pei = {
    id: 0,
    name: '',
    initialYear: '',
    finalYear:'',
    isDelete: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  rutaActual = "pei";
  public peis: Array<peiModel.Pei> = [];
  public user = this.Storage.get_storage("user");
  token = this.user.token;
  public filter: string = "";
  public _delete: string = "";
  public data_update: peiModel.Pei = this.pei_example;

  public page: number = 0;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []

  constructor(private Storage: Storage, private service: peiService, private router:Router) { }
  ngOnInit(): void {
    this.initData();
    console.log(this.initData)
  }
  async initData() {
    const peis = await firstValueFrom(this.service.getPEI())
    this.peis = peis;
    this.maxPages = Math.round(this.peis.length / this.step)  // cantidad de paginas para los botones
    if ((this.peis.length % this.step) !== 0) { this.maxPages++ }; // si sobran pocos elementos agrega otra pagina
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages);
    console.log(this.peis.length);
  }

  nextPage() {
    this.page = this.page + this.step;
  }
  previousPage() {
    this.page = this.page - this.step;
  }
  selectPage(numPage: number) {
    this.page = numPage * this.step;
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

  set_update(_peis: peiModel.Pei) {
    this.data_update = _peis
  };

  update(name: string, initialYear: string, finalYear: string): any {
    console.log("entra a la funcion")
    const id = this.data_update.id; // ahi se aloja el id
    // validaciones
    if ((name === '')) { name = this.data_update.name }
    if ((initialYear  === '')) { initialYear = this.data_update.initialYear }
    if ((finalYear === '')) { finalYear = this.data_update.finalYear }
    try {
      this.service.updatePEI(name, initialYear, finalYear, id).subscribe((res: any) => {
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

