import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadorPaginacion'
})
export class IndicadorPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
