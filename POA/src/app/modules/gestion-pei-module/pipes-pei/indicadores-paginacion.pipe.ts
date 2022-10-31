import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadoresPaginacion'
})
export class IndicadoresPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
