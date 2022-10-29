import { Pipe, PipeTransform } from '@angular/core';
import { Area }from "../interfaces-pei/area.model";
import { Pei } from "../interfaces-pei/pei.model";
import { Objetivo } from "../interfaces-pei/objetivo.model";
import { Dimension } from "../interfaces-pei/dimension.model";

@Pipe({
  name: 'areasFiltro'
})
export class AreasFiltroPipe implements PipeTransform {

  transform(Area: Array<Area>, busqueda:string): Array<Area> {
    const result:Array<Area> = [];
    for(const post of Area){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
