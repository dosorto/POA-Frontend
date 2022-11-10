import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-pei',
  templateUrl: './all-pei.component.html',
  styleUrls: ['./all-pei.component.css']
})
export class AllPeiComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PeiService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
    this.initData_Institucion();
  }

  public idInsti: number = Number(this._route.snapshot.paramMap.get('idInsti'));
  private pei_example: Pei | any = {};
  rutaActual = "pei";
  public pei: Array<Pei> = [];
  public InstiList: Array<Institucion> = [];
  public InstiSeleccionado : Institucion | any;
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter: string = ""; // para filtar la tabla
  public _delete: string = ""; // define que elemento sera eliminado
  public data_update: Pei | any = this.pei_example; // define datos de un elemento a actualizar
  public pei_seleccionado: string = "";
  public insti_seleccionado: string = "";
  instiList: any = [];

  public page: number = 0;
  public step: number = 5;
  public maxPages: number = 1;
  public enumPages: number[] = []


  async initData() {
    const peis = await firstValueFrom(this.service.MostrarPei(this.idInsti));
    const instituciones = await firstValueFrom(this.service.getInstituciones());
    this.InstiList = instituciones;
    this.pei = peis;
    this.maxPages = ((this.pei.length % this.step) === 0) ? Math.floor(this.pei.length / this.step) : (Math.floor(this.pei.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages = Array(this.maxPages).fill(null).map((x, i) => i).slice(1, this.maxPages + 1);
    
  }

  async initData_Institucion() {
    this.service.getInstituciones().subscribe((data:any) =>console.log(data));
    this.service.getInstituciones().subscribe((data: any) => this.instiList = data);
  }

  mostrar_pei_idInsti(id: any) {
    this.service.mostrar_insti_id(id).subscribe((response:any) => 
    this.pei = response);
      
  }

  toDetail(idPei: number) {
    this.router.navigate(['/gestion_pei/pei/detail/', idPei.toString(), this.idInsti]);
  }
  toCreate() {
    this.router.navigate(['/gestion_pei/pei/create/', this.idInsti.toString()]);
  }
  toHome(){
    this.router.navigate(['/home']);
  }
  selectInsti(){
    this.router.navigate(['/gestion_pei/pei/list/',this.InstiSeleccionado]);
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
