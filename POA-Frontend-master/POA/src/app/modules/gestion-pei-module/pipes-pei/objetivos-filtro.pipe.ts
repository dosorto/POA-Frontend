import { Pipe, PipeTransform } from '@angular/core';
import {Objetivo} from '../interfaces-pei/objetivo.model'
@Pipe({
  name: 'objetivosFiltro'
})
export class ObjetivosFiltroPipe implements PipeTransform {

  transform(objetivos: Array<Objetivo>, busqueda:string): Array<Objetivo> {
    const result:Array<Objetivo> = [];
    for(const post of objetivos){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}
