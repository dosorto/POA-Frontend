import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreaService } from 'src/app/archivos_antiguos/area/area.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Pei } from "../../../interfaces-pei/pei.model";
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { Dimension } from "../../../interfaces-pei/dimension.model";

import { firstValueFrom } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-area-component',
  templateUrl: './all-area-component.component.html',
  styleUrls: ['./all-area-component.component.css']
})
export class AllAreaComponentComponent implements OnInit {
  area:Array<Area>=[];
  listaObjetivos: Array<Objetivo >=[];
  user = this.Storage.get_storage("user");
  filter:string=""; // para filtar la tabla
  pei_seleccionado:string="";
  objetivo_seleccionado:string="";
  dimension_seleccionado:string="";

  
  public page:number=0;
  public step:number=10;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(
    private Storage:Storage, 
              private service:AreaService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.initData();
  }async initData(){
    let area = await firstValueFrom(this.service.getArea())
    this.area = area;
    this.maxPages = Math.round(this.area.length / this.step ) + 1  // cantidad de paginas para los botones
    if((this.area.length % this.step ) !== 0 ){this.maxPages++}; // si sobran pocos elementos agrega otra pagina
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages);
    console.log(this.area.length);
    const Objetivos = await firstValueFrom(this.service.getObjetivos());
    this.listaObjetivos = Objetivos;
    console.log(this.listaObjetivos)
  }


  nextPage(){
    this.page = this.page + this.step;
  }
  previousPage(){
    this.page = this.page - this.step;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }

}
   
