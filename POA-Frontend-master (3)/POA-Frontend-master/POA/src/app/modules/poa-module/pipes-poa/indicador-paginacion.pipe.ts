import { Pipe, PipeTransform } from '@angular/core';
import { Indicadores } from '../interfaces-poa/Indicadores.model';

@Pipe({
  name: 'indicadorPaginacion'
})
export class IndicadorPaginacionPipe implements PipeTransform {

  transform(indicadores: Array<Indicadores>, steps:number, page:number): Array<Indicadores>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return indicadores.slice(page,page+steps);
  }

}
