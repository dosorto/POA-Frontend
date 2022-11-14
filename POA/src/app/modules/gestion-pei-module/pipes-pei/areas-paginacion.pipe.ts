import { Pipe, PipeTransform } from '@angular/core';
import { Area }from "../interfaces-pei/area.model";

@Pipe({
  name: 'areasPaginacion'
})
export class AreasPaginacionPipe implements PipeTransform {

  transform(area: Array<Area>, steps:number, page:number): Array<Area>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return area.slice(page,page+steps);
  }

}
