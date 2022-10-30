import { Pipe, PipeTransform } from '@angular/core';
import {Objetivo} from '../interfaces-pei/objetivo.model'
@Pipe({
  name: 'objetivosPaginacion'
})
export class ObjetivosPaginacionPipe implements PipeTransform {

  transform(resultado: Array<Objetivo>, steps:number, page:number): Array<Objetivo>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return resultado.slice(page,page+steps);
  }

}
