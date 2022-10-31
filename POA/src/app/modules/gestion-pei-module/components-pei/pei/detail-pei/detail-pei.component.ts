import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-pei',
  templateUrl: './detail-pei.component.html',
  styleUrls: ['./detail-pei.component.css']
})
export class DetailPeiComponent implements OnInit {


  rutaActual = "pei";
  public peis: Array<Pei> = [];

  public _delete: string = "";

  public page:number=0;
  public step:number=10;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private service:PeiService,
              private router:Router) { }

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    let peis = await firstValueFrom(this.service.getPEI())
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

  set_id_delete(id: string) {
    this._delete = id;
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
        icon: 'error',
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
