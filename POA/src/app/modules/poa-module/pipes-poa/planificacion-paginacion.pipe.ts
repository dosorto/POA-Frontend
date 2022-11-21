import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planificacionPaginacion'
})
export class PlanificacionPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
