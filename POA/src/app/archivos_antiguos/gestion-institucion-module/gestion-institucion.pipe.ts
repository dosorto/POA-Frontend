import { Pipe, PipeTransform } from '@angular/core';
import { InstitucionModels } from './institucion.model';
@Pipe({
  name: 'instFilter'
})
export class gestionInstitucionPipe implements PipeTransform {

  transform(pei: Array<InstitucionModels.Pei>, idInstitucion:number): Array<InstitucionModels.Pei> {
    const result:Array<InstitucionModels.Pei> = [];
    for(const post of pei){
      
        result.push(post);
      
    };
    return result;
  }
}