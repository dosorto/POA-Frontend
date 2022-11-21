import { Pipe, PipeTransform } from '@angular/core';
import { Poa } from '../interfaces-poa/poa.model';

@Pipe({
  name: 'paginacion'
})
export class POApaginacionPipe implements PipeTransform {

  transform(poa: Array<Poa>, steps:number, page:number): Array<Poa> {
    return poa.slice(page,page+steps);
  }
}
