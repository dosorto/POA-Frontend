import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../interfaces/empleado.model';

@Pipe({
  name: 'namesOnly'
})
export class NamesOnlyPipe implements PipeTransform {

  transform(dimensiones: Array<Empleado>):Array<string> {
    const result:Array<string> = [];
    for(const post of dimensiones){
          result.push(post.nombre);
      
    };
    return result;
  }

}
