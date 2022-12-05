import { Pipe, PipeTransform } from '@angular/core';
import { Poa } from "../../poa-module/interfaces-poa/poa.model";


@Pipe({
  name: 'poaPaginacion'
})
export class POApaginacionPipe implements PipeTransform {

  transform(poas: Array<Poa>, steps:number, page:number): Array<Poa>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return poas.slice(page,page+steps);
  }
}
