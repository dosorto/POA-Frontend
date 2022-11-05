import { Pipe, PipeTransform } from '@angular/core';
import { objetivomodel } from './objetivos.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(objetivos: Array<objetivomodel.objetivo>, busqueda:string): Array<objetivomodel.objetivo> {
    const result:Array<objetivomodel.objetivo> = [];
    for(const post of objetivos){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}