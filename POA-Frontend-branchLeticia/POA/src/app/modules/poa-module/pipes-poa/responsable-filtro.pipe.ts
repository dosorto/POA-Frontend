import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsableFiltro'
})
export class ResponsableFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
