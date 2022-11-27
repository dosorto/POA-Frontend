import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicadorFiltro'
})
export class IndicadorFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
