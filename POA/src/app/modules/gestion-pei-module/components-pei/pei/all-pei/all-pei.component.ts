import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pei',
  templateUrl: './all-pei.component.html',
  styleUrls: ['./all-pei.component.css']
})
export class AllPeiComponent implements OnInit {

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

}
