import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-area-component',
  templateUrl: './detail-area-component.component.html',
  styleUrls: ['./detail-area-component.component.css']
})
export class DetailAreaComponentComponent implements OnInit {
  area:Array<Area>=[];
  listaObjetivos: Array<Objetivo >=[];
  user = this.Storage.get_storage("user");
  _delete:string="";
  pei_seleccionado:string="";
  objetivo_seleccionado:string="";
  dimension_seleccionado:string="";
  
  public page:number=0;
  public step:number=10;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, 
              private service:AreasService,
              private router:Router) { }

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

  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete(){
    await this.service.eliminarArea(this._delete);
    Swal.fire({
      title: 'Area eliminada con exito',
      showConfirmButton: false,
      color:'white',
      background:'#F5B7B1',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      
    })
    setTimeout(function() {
      window.location.reload();
    },3000);
    
      
    window.location.reload();
    
  }


}
   
