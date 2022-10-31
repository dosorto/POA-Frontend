import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areasFiltro'
})
export class AreasFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
