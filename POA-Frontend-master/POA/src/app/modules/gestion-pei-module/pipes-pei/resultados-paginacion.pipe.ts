import { Pipe, PipeTransform } from '@angular/core';
import { Resultado } from '../interfaces-pei/resultado.model';
@Pipe({
  name: 'resultadosPaginacion'
})
export class ResultadosPaginacionPipe implements PipeTransform {

  transform(resultado: Array<Resultado>, steps:number, page:number): Array<Resultado>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return resultado.slice(page,page+steps);
  }
}
