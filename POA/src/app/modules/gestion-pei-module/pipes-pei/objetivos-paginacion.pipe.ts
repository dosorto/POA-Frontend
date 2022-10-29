import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objetivosPaginacion'
})
export class ObjetivosPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
