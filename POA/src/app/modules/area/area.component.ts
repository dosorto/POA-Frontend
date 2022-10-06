import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreaService } from './area.service';
import { AreaModels } from "./area.model";
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  rutaActual = "area";
  areas: Array<AreaModels.Area> = [];
  user = this.Storage.get_storage("user");
  _delete: string = "";
  data_update: Array<string> = [];

  constructor(private Storage: Storage, private service: AreaService) { }
  ngOnInit(): void {
    this.initData();
  }
  async initData() {
    let areas = await firstValueFrom(this.service.getAREA())
    this.areas = areas;
    console.log(areas);
  }
  set_id_delete(nombre: string) {
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete() {
    await this.service.eliminarAREA(this._delete);
    window.location.reload();
  }
  async crear_area( nombre: string, idObjetivo: number,idDimension: number, idPEI: number) {
    await this.service.crearArea(nombre, idObjetivo, idDimension, idPEI).subscribe((res: any) => {
      console.log(res);
      window.location.reload();
      Swal.fire({
        icon: 'success',
        title: 'AREA  registrado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },3000);
    }, (error: any) => {
      console.log(error);
    });
  }

  set_update(index: number) {
    const areaToUpdate = this.areas[index]
    this.data_update = [areaToUpdate.nombre, areaToUpdate.idObjetivo.toString() , 
      areaToUpdate.idDimension.toString() , 
      areaToUpdate.idPei.toString(), areaToUpdate.id.toString()];
  };

  update(nombre: string, idObjetivo: string,idDimension: string, idPei: string) {
    console.log("entra a la funcion")
    const id = this.data_update[2]; // ahi se aloja el id
    // validaciones
    if ((nombre === '')) { nombre = this.data_update[0] }
    if ((idObjetivo === '')) { idObjetivo = this.data_update[1] }
    if ((idDimension === '')) { idDimension = this.data_update[2] }
    if ((idPei === '')) { idPei = this.data_update[3] }
    try {
      this.service.actualizarAREA(nombre,parseInt(id),parseInt(idObjetivo), 
      parseInt(idDimension), (idPei)).subscribe((res: any) => {
        console.log(res);
      //  this.router.navigate(['/dimension']);
      }, (error: any) => {
        console.log(error);
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}






