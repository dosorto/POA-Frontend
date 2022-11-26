import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOAFiltro'
})
export class POAFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
