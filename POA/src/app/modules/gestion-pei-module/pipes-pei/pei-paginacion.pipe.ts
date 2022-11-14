import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peiPaginacion'
})
export class PeiPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
