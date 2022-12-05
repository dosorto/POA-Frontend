import { Pipe, PipeTransform } from '@angular/core';
import { Dimension } from '../interfaces-pei/dimension.model';
@Pipe({
  name: 'dimensionFilter'
})
export class DimensionPipe implements PipeTransform {

  transform(dimensiones: Array<Dimension>, busqueda:string): Array<Dimension> {
    const result:Array<Dimension> = [];
    for(const post of dimensiones){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
