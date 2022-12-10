import { Pipe, PipeTransform } from '@angular/core';
import { Actividad } from '../interfaces-poa/actividad.model';
@Pipe({
  name: 'actividadPaginacion'
})
export class ActividadPaginacionPipe implements PipeTransform {

  transform(actividad: Array<Actividad>, steps:number, page:number): Array<Actividad>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return actividad.slice(page,page+steps);
  }

}