import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-pei',
  templateUrl: './delete-pei.component.html',
  styleUrls: ['./delete-pei.component.css']
})
export class DeletePeiComponent implements OnInit {

  private pei_example: Pei = {
    id: 0,
    name: '',
    initialYear: '',
    finalYear: '',
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

  public page: number = 0;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []

  constructor(private Storage: Storage, private service: PeiService, private router:Router) { }

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
    try{
    await this.service.eliminarPEI(this._delete).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado con éxito!',
        showConfirmButton: false,
        timer: 1000
      })
    },(error:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Ha ocurrido un error: ' + error,
        showConfirmButton: false,
        timer: 1000
      })
    });

   } catch(error){
    Swal.fire({
      icon: 'error',
      title: '¡Ha ocurrido un error!',
      showConfirmButton: false,
      timer: 1000
    })
   }
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }


}
