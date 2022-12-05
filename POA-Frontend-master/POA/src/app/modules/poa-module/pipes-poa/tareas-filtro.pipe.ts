import { Pipe, PipeTransform } from '@angular/core';
import {Tareas} from '../interfaces-poa/tareas.model'

@Pipe({
  name: 'tareasFiltro'
})
export class TareasFiltroPipe implements PipeTransform {

  transform(tareas: Array<Tareas>, busqueda:string): Array<Tareas> {
    const result:Array<Tareas> = [];
    for(const post of tareas){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}
