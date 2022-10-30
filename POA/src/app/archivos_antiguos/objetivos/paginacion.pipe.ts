
import { Pipe, PipeTransform } from '@angular/core';
import { objetivomodel } from './objetivos.model';
@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(resultado: Array<objetivomodel.objetivo>, steps:number, page:number): Array<objetivomodel.objetivo>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return resultado.slice(page,page+steps);
  }
}