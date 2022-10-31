import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';


@Component({
  selector: 'app-all-dimension',
  templateUrl: './all-dimension.component.html',
  styleUrls: ['./all-dimension.component.css']
})
export class AllDimensionComponent implements OnInit {
  
  constructor(private Storage:Storage, 
              private service:DimensionService,
              private router:Router,
              private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.initData();
    
  }
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  private dimension_example : Dimension | any = {};
  rutaActual = "Dimension"; //sirve para definir iconos del sidevar
  public dimensiones:Array<Dimension>=[]; // para llenar la tabla
  //public pei:Pei = this.dimensiones[0].pei; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :Dimension | any = this.dimension_example; // define datos de un elemento a actualizar
  public pei_seleccionado:string="";
  
  public page:number=0;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  // metodos propios
  async initData(){
    // obtiene todas las dimensiones
    const dimensiones = await firstValueFrom(this.service.getdimensiones(this.idPei))
    this.dimensiones = dimensiones;
    // sirve para definir un maximo de paginas en paginacion de tablas
    this.maxPages = ((this.dimensiones.length  % this.step ) === 0 ) ? Math.floor(this.dimensiones.length / this.step) : (Math.floor(this.dimensiones.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
    //obtiene todos los peis para dejarlos en el select
  }
  toDetail(idDimension:number){
    this.router.navigate(['/gestion_pei/dimension/detail/',idDimension.toString()]);
  }
  toCreate(){
    this.router.navigate(['/gestion_pei/dimension/create/',this.idPei.toString()]);
  }

  nextPage(){
    this.page = this.page + this.step;
    console.log(this.page)
  }
  previousPage(){
    this.page = this.page - this.step;
    console.log(this.page)
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }

  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
}
