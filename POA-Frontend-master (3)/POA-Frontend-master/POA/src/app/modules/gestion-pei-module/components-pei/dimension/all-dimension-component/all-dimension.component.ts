import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { PeiService } from '../../../services-pei/pei.service';


@Component({
  selector: 'app-all-dimension',
  templateUrl: './all-dimension.component.html',
  styleUrls: ['./all-dimension.component.css']
})
export class AllDimensionComponent implements OnInit {
  
  constructor(private Storage:Storage, 
              private service:DimensionService,
              private peiService:PeiService,
              private router:Router,
              private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.initData();
    
  }
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public insti:Institucion | any = {};
  public pei:Pei | any = {};
  public PeiList:Array<Pei> = [];
  private dimension_example : Dimension | any = {};
  public dimensiones:Array<Dimension>=[]; // para llenar la tabla
  //public pei:Pei = this.dimensiones[0].pei; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :Dimension | any = this.dimension_example; // define datos de un elemento a actualizar
  public pei_seleccionado:number=this.idPei;
  
  public page:number=0;
  public actualpage:number = 1;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  // metodos propios
  async initData(){
    // obtiene todas las dimensiones
    const dimensiones = await firstValueFrom(this.service.getdimensiones(this.idPei))
    this.dimensiones = dimensiones;

    this.pei = await this.peiService.getPEI_Id(this.idPei).subscribe((response:any)=>{
      this.pei = response.pei;
    })
    this.insti = await this.peiService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion;
    })
    this.PeiList = await firstValueFrom(this.peiService.MostrarPei(this.idInsti));
    console.log(this.PeiList);
    // sirve para definir un maximo de paginas en paginacion de tablas
    //this.maxPages = ((this.dimensiones.length  % this.step ) === 0 ) ? Math.floor(this.dimensiones.length / this.step) : (Math.floor(this.dimensiones.length / this.step) + 1)// cantidad de paginas para los botones
    this.maxPages = Math.round(this.dimensiones.length / this.step);
    
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idDimension:number){
    this.router.navigate(['/gestion_pei/dimension/detail/',idDimension.toString(),this.idPei, this.idInsti]);
  }
  toCreate(){
    this.router.navigate(['/gestion_pei/dimension/create/',this.idPei.toString(), this.idInsti]);
  }
  toPeiList(){
    this.router.navigate(['/gestion_pei/pei/detail/',this.idPei,this.idInsti.toString()]);
  }
  toInstiList(){
    this.router.navigate(['/gestion_pei/pei/list/',this.idInsti.toString()]);
  }

  selectPei(){
    this.router.navigate(['/gestion_pei/dimension/list/',this.pei_seleccionado,this.idInsti]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
  nextPage(){
    this.page = this.page + this.step;
    this.actualpage++;
  }
  previousPage(){
    this.page = this.page - this.step;
    this.actualpage--;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }

  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
}
