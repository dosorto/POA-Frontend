import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreaService } from './area.service';
import { AreaModels } from './area.model';
import { firstValueFrom } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  rutaActual = "area";
  area:Array<AreaModels.Area>=[];
  listaObjetivos: Array<AreaModels.Objetivo>=[];
  listadimension: Array<AreaModels.Dimension>=[];
  lista_pei:Array<AreaModels.Pei>=[]; // para llenar la tabla
  user = this.Storage.get_storage("user");
  filter:string=""; // para filtar la tabla
  _delete:string="";
  data_update:Array<string>=[];
  pei_seleccionado:string="";
  objetivo_seleccionado:string="";
  dimension_seleccionado:string="";

  public page:number=0;
  public step:number=11;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, 
              private service:AreaService,
              private router:Router) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData(){
    let area = await firstValueFrom(this.service.getArea())
    this.area = area;
    this.maxPages = Math.round(this.area.length / this.step ) + 1  // cantidad de paginas para los botones
    if((this.area.length % this.step ) !== 0 ){this.maxPages++}; // si sobran pocos elementos agrega otra pagina
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages);
    console.log(this.area.length);
    const peis = await firstValueFrom(this.service.getPeiList())
    this.lista_pei = peis;
    const Objetivos = await firstValueFrom(this.service.getObjetivos())
    this.listaObjetivos = Objetivos;
    const Dimension = await firstValueFrom(this.service.getDimensiones())
    this.listadimension = Dimension;
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








  async crearArea(nombre:string,idObjetivo:number,idDimension:number,idPei:number){
    await this.service.crearArea(nombre,idObjetivo,idDimension,idPei).subscribe((res:any)=>{
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
  
  set_update(index:number){
    const AreaUpdate = this.area[index]
    this.data_update = [AreaUpdate.nombre, AreaUpdate.idObjetivo.toString(),AreaUpdate.idDimension.toString(), AreaUpdate.idPei.toString(),AreaUpdate.id.toString()];
  };
  update(nombre:string,idObjetivo:string,idDimension:string, idPei:string){
     const id = this.data_update[4]; // ahi se aloja el id
     // validaciones
    if((nombre === '')){nombre = this.data_update[0]}
    if((idObjetivo === '')){idObjetivo= this.data_update[1]}
    if((idDimension === '')){idDimension= this.data_update[2]}
    if((idPei === '')){idPei= this.data_update[3]}
     try{
     this.service.updateArea(nombre,parseInt(id),parseInt(idObjetivo),parseInt(idDimension),parseInt(idPei)).subscribe((res:any)=>{
       console.log(res);
     
      }, (error: any) => {
        console.log(error);
      });
      Swal.fire({
        icon: 'success',
        title: '!Area actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function () {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  }
}
   
