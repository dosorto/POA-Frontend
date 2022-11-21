import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsablePaginacion'
})
export class ResponsablePaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
