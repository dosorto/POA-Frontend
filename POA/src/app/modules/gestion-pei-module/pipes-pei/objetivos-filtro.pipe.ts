import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objetivosFiltro'
})
export class ObjetivosFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
