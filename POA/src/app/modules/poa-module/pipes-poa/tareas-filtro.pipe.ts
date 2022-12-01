import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tareasFiltro'
})
export class TareasFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
