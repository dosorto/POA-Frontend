import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areasPaginacion'
})
export class AreasPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
