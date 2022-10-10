import { Pipe, PipeTransform } from '@angular/core';
import { DimensionModels } from './dimension.model';
@Pipe({
  name: 'dimensionFilter'
})
export class DimensionPipe implements PipeTransform {

  transform(dimensiones: Array<DimensionModels.dimension>, busqueda:string): Array<DimensionModels.dimension> {
    const result:Array<DimensionModels.dimension> = [];
    for(const post of dimensiones){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
