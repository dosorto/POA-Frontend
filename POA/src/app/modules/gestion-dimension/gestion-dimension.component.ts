import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from './dimension.service';
import { DimensionModels } from './dimension.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { DimensionPipe } from './dimension.pipe';
@Component({
  selector: 'app-gestion-Dimension',
  templateUrl: './gestion-dimension.component.html',
  styleUrls: ['./gestion-dimension.component.css']
})
export class GestionDimensionComponent implements OnInit {
  rutaActual = "Dimension"; //sirve para definir iconos del sidevar
  dimensiones:Array<DimensionModels.dimension>=[]; // para llenar la tabla
  lista_pei:Array<DimensionModels.Pei>=[]; // para llenar la tabla
  user = this.Storage.get_storage("user"); // obtener el usuario logueado
  filter:string=""; // para filtar la tabla
  _delete:string=""; // define que elemento sera eliminado
  data_update:Array<string>=[]; // define datos de un elemento a actualizar
  pei_seleccionado:string="";
  
  public page:number=0;
  public step:number=3;
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
    this.maxPages = Math.round(this.dimensiones.length / this.step ) + 1  // cantidad de paginas para los botones
    if((this.dimensiones.length % this.step ) !== 0 ){this.maxPages++}; // si sobran pocos elementos agrega otra pagina
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages);
    console.log(this.dimensiones.length);
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
      // console.log(res);
       window.location.reload();
    },(error:any)=>{
      console.log(error);
    });
  }

  set_update(index:number){
    const instToUpdate = this.dimensiones[index]
    this.data_update = [instToUpdate.nombre, instToUpdate.descripcion, instToUpdate.idPei.toString(),instToUpdate.id.toString()];//,instToUpdate.id
  };
  update(nombre:string,descripcion:string, idPei:string){
     const id = this.data_update[3]; // ahi se aloja el id
     // validaciones
    if((nombre === '')){nombre = this.data_update[0]}
    if((descripcion === '')){descripcion= this.data_update[1]}
    if((idPei === '')){idPei= this.data_update[2]}
     try{
     this.service.updateDimension(nombre,descripcion,parseInt(id),parseInt(idPei)).subscribe((res:any)=>{
       console.log(res);
       this.initData();
       //this.router.navigate(['/dimension']);
     },(error:any)=>{
       console.log(error);
       
     });
     
     
   } catch(error){
     console.log(error);
   }
   setTimeout(function() {
    window.location.reload();
  },100);
  }
}
