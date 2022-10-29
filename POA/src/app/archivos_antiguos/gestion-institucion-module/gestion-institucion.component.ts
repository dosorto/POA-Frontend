import { Component, OnInit } from '@angular/core';
import { Storage } from '../../_core/global-services/local_storage.service';
import { InstitucionService } from './institucion.service';
import { InstitucionModels } from './institucion.model';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-institucion',
  templateUrl: './gestion-institucion.component.html',
  styleUrls: ['./gestion-institucion.component.css']
})
export class GestionInstitucionComponent implements OnInit {
  // private pei_example: InstitucionModels.Pei = {
  //   id: 0,
  //   name: '',
  //   initialYear: '',
  //   finalYear:'',
  //   isDelete: false,
  //   isActive: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  public peis: Array<InstitucionModels.Pei> = [];
  rutaActual = "institucion";
  instituciones:Array<InstitucionModels.Institucion>=[];
  user = this.Storage.get_storage("user");
  _delete:number=0;
  data_update:Array<string>=[];
  busqueda :string = '';
  public selected:number=0;

  public page:number=0;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, private service:InstitucionService, public router:Router) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData(){
    let instituciones = await firstValueFrom(this.service.getInstituciones())
    this.instituciones = instituciones;
    this.peis = await firstValueFrom(this.service.getPEI());
    console.log(this.peis);

    this.maxPages = ((this.instituciones.length % this.step ) === 0 ) ? Math.floor(this.instituciones.length / this.step) : (Math.floor(this.instituciones.length / this.step) + 1)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;
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
  set_id_delete(id:number){
    this._delete = id;
    console.log(this._delete)
  }
  async delete(){
    try{
    await this.service.eliminarInstitucion(this._delete).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 2500
      })
    });
    
    setTimeout(function() {
      window.location.reload();
    },2500);
  }catch(error){
    Swal.fire({
      icon: 'error',
      title: '¡Ha ocurrido un error! '+error,
      showConfirmButton: false,
      timer: 2500
    })
    setTimeout(function() {
      window.location.reload();
    },2500);
  }
  }
  async crear_institucion(nombre:string,descripcion:string){
    await this.service.crearInstitucion(nombre,descripcion).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    },(error:any)=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 2500
      })
    });
  }

  set_update(index:number){
    const instToUpdate = this.instituciones[index-1]
    this.data_update = [instToUpdate.nombre, instToUpdate.descripcion,instToUpdate.id];
  };
 async update(nombre:string,descripcion:string){
    const id = this.data_update[2]; // ahi se aloja el id
    // validaciones
    if((nombre === '')){nombre = this.data_update[0]}
    if((descripcion === '')){descripcion= this.data_update[1]}
    try{
    await this.service.updateInstitucion(nombre,descripcion,parseInt(id)).subscribe((res:any)=>{
      console.log('recibe 200')
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      
    },(error:any)=>{
    console.log("capta error");
      Swal.fire({
        icon: 'error',
        title: '¡Ha ocurrido un error!',
        showConfirmButton: false,
        timer: 2500
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1500);
  } catch(error){
    Swal.fire({
      icon: 'error',
      title: '¡Ha ocurrido un error!',
      showConfirmButton: false,
      timer: 2500
    })
    setTimeout(function() {
      window.location.reload();
    },1500);
  }
  }
}
