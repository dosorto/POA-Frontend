import { Pipe, PipeTransform } from '@angular/core';
import { Dimension } from '../interfaces-pei/dimension.model';


@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(dimensiones: Array<Dimension>, steps:number, page:number): Array<Dimension>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return dimensiones.slice(page,page+steps);
  }

}
