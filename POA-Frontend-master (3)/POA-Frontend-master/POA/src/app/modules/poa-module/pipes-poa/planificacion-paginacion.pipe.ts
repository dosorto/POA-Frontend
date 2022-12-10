import { Planificacion } from './../interfaces-poa/planificacion.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planificacionPaginacion'
})
export class PlanificacionPaginacionPipe implements PipeTransform {

  transform(planificaciones: Array<Planificacion>, steps:number, page:number): Array<Planificacion>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return planificaciones.slice(page,page+steps);
  }

}
