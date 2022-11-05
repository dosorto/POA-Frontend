import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peiFiltro'
})
export class PeiFiltroPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
