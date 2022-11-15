import { Pipe, PipeTransform } from '@angular/core';
import { InstitucionModels } from './institucion.model';

@Pipe({
  name: 'institucionSearch'
})
export class InstitucionPipe implements PipeTransform {

  transform(Instituciones: Array<InstitucionModels.Institucion>, busqueda:string): Array<InstitucionModels.Institucion> {
    const result:Array<InstitucionModels.Institucion> = [];
    for(const post of Instituciones){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
