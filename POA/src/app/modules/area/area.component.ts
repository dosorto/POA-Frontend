import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreaService } from './area.service';
import { AreaModels } from './area.model';
import { firstValueFrom } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  rutaActual = "area";
  area:Array<AreaModels.Area>=[];
  user = this.Storage.get_storage("user");
  
  _delete:string="";
  data_update:Array<string>=[];

  constructor(private Storage:Storage, 
              private service:AreaService,
              private router:Router) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData(){
    let area = await firstValueFrom(this.service.getArea())
    this.area = area;
    console.log(area);
  }
  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete(){
    await this.service.eliminarArea(this._delete);
    window.location.reload();
  }
  async crearArea(nombre:string,idObjetivo:number,idDimension:number,idPei:number){
    await this.service.crearArea(nombre,idObjetivo,idDimension,idPei).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },(error:any)=>{
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
       window.location.reload();
       this.router.navigate(['/area']);
     },(error:any)=>{
       console.log(error);
       
     });
     
     
   } catch(error){
     console.log(error);
   }
  }
}
