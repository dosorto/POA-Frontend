import { Pipe, PipeTransform } from '@angular/core';
import { Institucion } from '../interfaces/institucion.model';

@Pipe({
  name: 'instiFilter'
})
export class InstiFilterPipe implements PipeTransform {

  transform(dimensiones: Array<Institucion>, busqueda:string): Array<Institucion> {
    const result:Array<Institucion> = [];
    for(const post of dimensiones){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
