import { Pipe, PipeTransform } from '@angular/core';
import { AreaModels } from './area.model';
@Pipe({
  name: 'AreaFilter'
})
export class AreaPipe implements PipeTransform {

  transform(Area: Array<AreaModels.Area>, busqueda:string): Array<AreaModels.Area> {
    const result:Array<AreaModels.Area> = [];
    for(const post of Area){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
