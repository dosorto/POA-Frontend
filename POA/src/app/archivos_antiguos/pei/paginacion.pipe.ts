import { Pipe, PipeTransform } from '@angular/core';
import { peiModel } from './pei.model';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(peis: Array<peiModel.Pei>, steps:number, page:number): Array<peiModel.Pei>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return peis.slice(page,page+steps);
  }

}