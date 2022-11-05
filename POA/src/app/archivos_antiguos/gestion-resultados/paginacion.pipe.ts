import { Pipe, PipeTransform } from '@angular/core';
import { ResultadoModels } from './resultado.model';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(resultado: Array<ResultadoModels.Resultado>, steps:number, page:number): Array<ResultadoModels.Resultado>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return resultado.slice(page,page+steps);
  }
}
