import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadoresFiltro'
})
export class IndicadoresFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
