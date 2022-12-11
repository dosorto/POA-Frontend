import { Pipe, PipeTransform } from '@angular/core';
import { Indicador } from '../interfaces-pei/indicadores.model'; 
@Pipe({
  name: 'indicadoresPaginacion'
})
export class IndicadoresPaginacionPipe implements PipeTransform {

  transform(indicador: Array<Indicador>, steps:number, page:number): Array<Indicador>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return indicador.slice(page,page+steps);
  }
}