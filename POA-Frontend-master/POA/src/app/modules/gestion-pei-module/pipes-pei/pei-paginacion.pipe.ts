import { Pipe, PipeTransform } from '@angular/core';
import {Pei} from '../interfaces-pei/pei.model';

@Pipe({
  name: 'peiPaginacion'
})
export class PeiPaginacionPipe implements PipeTransform {

  transform(peis: Array<Pei>, steps:number, page:number): Array<Pei>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return peis.slice(page,page+steps);
  }

}
