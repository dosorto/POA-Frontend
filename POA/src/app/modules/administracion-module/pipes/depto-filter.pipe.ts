import { Pipe, PipeTransform } from '@angular/core';
import { Departamento } from '../interfaces/depto.model';

@Pipe({
  name: 'deptoFilter'
})
export class DeptoFilterPipe implements PipeTransform {

  transform(dimensiones: Array<Departamento>, busqueda:string): Array<Departamento> {
    const result:Array<Departamento> = [];
    for(const post of dimensiones){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
