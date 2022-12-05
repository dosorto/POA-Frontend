import { Pipe, PipeTransform } from '@angular/core';
import { peiModel } from './pei.model';
@Pipe({
  name: 'peiFilter'
})
export class PeiPipe implements PipeTransform {

  transform(pei: Array<peiModel.Pei>, busqueda:string): Array<peiModel.Pei> {
    const result:Array<peiModel.Pei> = [];
    for(const post of pei){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}