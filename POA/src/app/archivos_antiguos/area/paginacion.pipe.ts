import { Pipe, PipeTransform } from '@angular/core';
import { AreaModels } from './area.model';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(area: Array<AreaModels.Area>, steps:number, page:number): Array<AreaModels.Area>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return area.slice(page,page+steps);
  }

}
