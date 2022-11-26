import { Pipe, PipeTransform } from '@angular/core';
import { InstitucionModels } from './institucion.model';
@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(dimensiones: Array<InstitucionModels.Institucion>, steps:number, page:number): Array<InstitucionModels.Institucion>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return dimensiones.slice(page,page+steps);
  }

}
