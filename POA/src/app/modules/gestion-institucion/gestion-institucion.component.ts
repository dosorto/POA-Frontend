import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { InstitucionService } from './institucion.service';
import { InstitucionModels } from './institucion.model';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-gestion-institucion',
  templateUrl: './gestion-institucion.component.html',
  styleUrls: ['./gestion-institucion.component.css']
})
export class GestionInstitucionComponent implements OnInit {
  rutaActual = "institucion";
  instituciones:Array<InstitucionModels.Institucion>=[];
  user = this.Storage.get_storage("user");
  _delete:string="";
  data_update:Array<string>=[];

  constructor(private Storage:Storage, private service:InstitucionService) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData(){
    let instituciones = await firstValueFrom(this.service.getInstituciones())
    this.instituciones = instituciones;
  }
  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete(){
    await this.service.eliminarInstitucion(this._delete);
    window.location.reload();
  }
  async crear_institucion(nombre:string,descripcion:string){
    await this.service.crearInstitucion(nombre,descripcion).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    },(error:any)=>{
      console.log(error);
    });
  }

  set_update(index:number){
    const instToUpdate = this.instituciones[index]
    this.data_update = [instToUpdate.nombre, instToUpdate.descripcion,instToUpdate.id];
  };
  async update(nombre:string,descripcion:string){
  //   const id = this.data_update[2]; // ahi se aloja el id
  //   console.log(nombre);
  //   try{
  //   await this.service.updateInstitucion(nombre,descripcion,parseInt(id)).subscribe((res:any)=>{
  //     console.log(res);
  //     window.location.reload();
  //   },(error:any)=>{
  //     console.log(error);
  //   });
  // } catch(error){
  //   console.log(error);
  // }
  }
}
