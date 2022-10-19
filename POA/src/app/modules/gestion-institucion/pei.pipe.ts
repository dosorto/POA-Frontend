import { Pipe, PipeTransform } from '@angular/core';
import { InstitucionModels } from './institucion.model';
@Pipe({
  name: 'peiFilter'
})
export class PeiPipe implements PipeTransform {

  transform(pei: Array<InstitucionModels.Pei>, busqueda:string): Array<InstitucionModels.Pei> {
    const result:Array<InstitucionModels.Pei> = [];
    for(const post of pei){
      if(post){
         result.push(post);
      };
    };
    return result;
  }
}