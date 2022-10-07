import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from './dimension.service';
import { DimensionModels } from './dimension.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-Dimension',
  templateUrl: './gestion-dimension.component.html',
  styleUrls: ['./gestion-dimension.component.css']
})
export class GestionDimensionComponent implements OnInit {

  // objeto tipo dimension para usarlo de base
  private dimension_example :DimensionModels.dimension = {
    id:          0,
    nombre:      "",
    descripcion: "",
    isDelete:    false,
    createdAt:   new Date(),
    updatedAt:   new Date(),
    idPei:       1,
    pei:{
      id:0,
      name:        '',
      initialYear: new Date(),
      finalYear:   new Date(),
      isActive:    true,
      isDelete:    false,
      createdAt:   new Date(),
      updatedAt:   new Date(),
    }
};

  rutaActual = "Dimension"; //sirve para definir iconos del sidevar
  public dimensiones:Array<DimensionModels.dimension>=[]; // para llenar la tabla
  public lista_pei:Array<DimensionModels.Pei>=[]; // para llenar la tabla
  public user = this.Storage.get_storage("user"); // obtener el usuario logueado
  public filter:string=""; // para filtar la tabla
  public _delete:string=""; // define que elemento sera eliminado
  public data_update :DimensionModels.dimension = this.dimension_example; // define datos de un elemento a actualizar
  public pei_seleccionado:string="";
  
  public page:number=0;
  public step:number=5;
  public maxPages:number=1;
  public enumPages:number[]=[]

  constructor(private Storage:Storage, 
              private service:DimensionService,
              private router:Router) { }

  
  ngOnInit(): void {
    this.initData();
  }
 

  // metodos propios
  async initData(){
    const dimensiones = await firstValueFrom(this.service.getdimensiones())
    this.dimensiones = dimensiones;
    this.maxPages = Math.round(this.dimensiones.length / this.step ) // cantidad de paginas para los botones
    if((this.dimensiones.length % this.step ) !== 0 ){this.maxPages++}; // si sobran pocos elementos agrega otra pagina
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages);
    const peis = await firstValueFrom(this.service.getPeiList())
    this.lista_pei = peis;
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
    await this.service.eliminarDimension(this._delete);
    setTimeout(function() {
      window.location.reload();
    },100);
  }
  async crear_Dimension(nombre:string,descripcion:string,idPei:string){
    await this.service.crearDimension(nombre,descripcion,parseInt(idPei)).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1500);
  }

  set_update(_dimension:DimensionModels.dimension){
    this.data_update = _dimension
  };
  update(nombre:string,descripcion:string, idPei:string):any{
     const id = this.data_update.id; // ahi se aloja el id
     // validaciones
    if((nombre === '')){nombre = this.data_update.nombre}
    if((descripcion === '')){descripcion= this.data_update.descripcion}
    if((idPei === '')){idPei = this.data_update.idPei.toString()}
     try{
      this.service.updateDimension(nombre,descripcion,id,parseInt(idPei)).subscribe((res:any)=>{
      
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
     },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
     });
     
     
   } catch(error){
     console.log(error);
   }
   setTimeout(function() {
    window.location.reload();
  },1500);
  }
}
