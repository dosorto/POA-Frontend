import { Pipe, PipeTransform } from '@angular/core';
import { UnidadEjecutora } from '../../poa-module/interfaces-poa/unidad_ejecutora.model';

@Pipe({
  name: 'ueFilter'
})
export class UeFilterPipe implements PipeTransform {

  transform(dimensiones: Array<UnidadEjecutora>, busqueda:string): Array<UnidadEjecutora> {
    const result:Array<UnidadEjecutora> = [];
    for(const post of dimensiones){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
