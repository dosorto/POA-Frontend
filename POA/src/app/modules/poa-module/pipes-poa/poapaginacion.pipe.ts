import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pOApaginacion'
})
export class POApaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
