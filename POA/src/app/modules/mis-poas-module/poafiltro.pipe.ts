import { Pipe, PipeTransform } from '@angular/core';
import { Poa } from '../poa-module/interfaces-poa/poa.model';
@Pipe({
  name: 'poaFiltro'
})
export class POAFiltroPipe implements PipeTransform {

  transform(poa: Array<Poa>, busqueda:string): Array<Poa> {
    const result:Array<Poa> = [];
    for(const post of poa){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}
