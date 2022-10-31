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
    initialYear: '',
    finalYear: '',
    isDelete: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    idInstitucion: 1
  };

  rutaActual = "pei";
  public peis: Array<Pei> = [];


  public filter: string = "";
  public _delete: string = "";
  public data_update: Pei = this.pei_example;

  public page: number = 0;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []

  constructor(private service: PeiService, private router:Router) { }

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

  set_update(_peis: Pei) {
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
