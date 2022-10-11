import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from './dimension.service';
import { DimensionModels } from './dimension.model';
import { firstValueFrom } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-Dimension',
  templateUrl: './gestion-dimension.component.html',
  styleUrls: ['./gestion-dimension.component.css']
})
export class GestionDimensionComponent implements OnInit {
  rutaActual = "Dimension";

  dimensiones:Array<DimensionModels.dimension>=[];
  user = this.Storage.get_storage("user");
  
  _delete:string="";
  data_update:Array<string>=[];

  constructor(private Storage:Storage, 
              private service:DimensionService,
              private router:Router) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData(){
    let dimensiones = await firstValueFrom(this.service.getdimensiones())
    this.dimensiones = dimensiones;
    console.log(dimensiones);
  }
  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete(){
    await this.service.eliminarDimension(this._delete);
    window.location.reload();
  }
  async crear_Dimension(nombre:string,descripcion:string,idPei:number){
    await this.service.crearDimension(nombre,descripcion,idPei).subscribe((res:any)=>{
      console.log(res);
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
       this.router.navigate(['/dimension']);
     },(error:any)=>{
       console.log(error);
       
     });
     
     
   } catch(error){
     console.log(error);
   }
  }
}
