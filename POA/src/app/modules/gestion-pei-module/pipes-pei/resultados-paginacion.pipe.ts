import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultadosPaginacion'
})
export class ResultadosPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
