import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tareasPaginacion'
})
export class TareasPaginacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
