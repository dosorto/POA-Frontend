import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.css']
})
export class CreateAreaComponent implements OnInit {
  area:Array<Area>=[];
  listaObjetivos: Array<Objetivo >=[];
  user = this.Storage.get_storage("user");
  _delete:string="";
  pei_seleccionado:string="";
  objetivo_seleccionado:string="";
  dimension_seleccionado:string="";
  data_update:Array<string>=[];
  

  constructor(private Storage:Storage, 
              private service:AreasService,
              private router:Router) { }

  ngOnInit(): void {
    this.initData();
  }async initData(){
    let area = await firstValueFrom(this.service.getArea())
    this.area = area;
   console.log(this.area.length);
    const Objetivos = await firstValueFrom(this.service.getObjetivos());
    this.listaObjetivos = Objetivos;
    console.log(this.listaObjetivos)
  }


  async crearArea(nombre:string,idObjetivo:number){
    await this.service.crearArea(nombre,idObjetivo).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Area registrada con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    }, (error: any) => {
      console.log(error);
    });
  }

}
