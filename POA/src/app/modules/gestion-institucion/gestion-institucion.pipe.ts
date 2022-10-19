import { Pipe, PipeTransform } from '@angular/core';
import { InstitucionModels } from './institucion.model';
@Pipe({
  name: 'instFilter'
})
export class gestionInstitucionPipe implements PipeTransform {

  transform(pei: Array<InstitucionModels.Pei>, busqueda:string): Array<InstitucionModels.Pei> {
    const result:Array<InstitucionModels.Pei> = [];
    for(const post of pei){
      if((post.name.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.name.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}