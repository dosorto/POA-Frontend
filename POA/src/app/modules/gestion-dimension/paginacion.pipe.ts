import { Pipe, PipeTransform } from '@angular/core';
import { DimensionModels } from './dimension.model';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(dimensiones: Array<DimensionModels.dimension>, steps:number, page:number): Array<DimensionModels.dimension>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return dimensiones.slice(page,page+steps);
  }

}
