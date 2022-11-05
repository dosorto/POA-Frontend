import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultadosFiltro'
})
export class ResultadosFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
