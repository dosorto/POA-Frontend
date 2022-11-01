import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-area-component',
  templateUrl: './all-area-component.component.html',
  styleUrls: ['./all-area-component.component.css']
})
export class AllAreaComponentComponent implements OnInit {
  constructor(
    private Storage: Storage,
    private service: AreasService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  public idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  private dimension_example : Area | any = {};
  public area: Array<Area> = [];
  public listaObjetivos: Array<Objetivo> = [];
  public user = this.Storage.get_storage("user");
  public filter: string = ""; // para filtar la tabla
  public pei_seleccionado: string = "";
  public objetivo_seleccionado: string = "";
  public dimension_seleccionado: string = "";



  public page: number = 0;
  public step: number = 10;
  public maxPages: number = 1;
  public enumPages: number[] = []

  async initData() {
    let area = await firstValueFrom(this.service.getAreas())
    this.area = area;
    this.maxPages = Math.round(this.area.length / this.step) + 1  // cantidad de paginas para los botones
    if ((this.area.length % this.step) !== 0) { this.maxPages++ }; // si sobran pocos elementos agrega otra pagina
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages);
    console.log(this.area.length);
    const Objetivos = await firstValueFrom(this.service.getObjetivos());
    this.listaObjetivos = Objetivos;
    console.log(this.listaObjetivos)
  }
  toDetail(idArea:number){
    this.router.navigate(['/gestion_pei/areas/detail/',idArea.toString(),this.idObjetivo]);
  }
  toCreate(){
    this.router.navigate(['/gestion_pei/areas/create/',this.idObjetivo.toString()]);
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

