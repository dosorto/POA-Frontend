import { Pipe, PipeTransform } from '@angular/core';
import {Pei} from '../interfaces-pei/pei.model';

@Pipe({
  name: 'peiFiltro'
})
export class PeiFiltroPipe implements PipeTransform {

  transform(pei: Array<Pei>, busqueda:string): Array<Pei> {
    const result:Array<Pei> = [];
    for(const post of pei){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
