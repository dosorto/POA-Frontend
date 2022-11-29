import { Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../interfaces-poa/actividad.model';


@Pipe({
  name: 'ActividadFilter'
})
export class ActividadFiltroPipe implements PipeTransform {

  transform(Actividad: Array<Actividad>, busqueda:string): Array<Actividad> {
    const result:Array<Actividad> = [];
    for(const post of Actividad){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
