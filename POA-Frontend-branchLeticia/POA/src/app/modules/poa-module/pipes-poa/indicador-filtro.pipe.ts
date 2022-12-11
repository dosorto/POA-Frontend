import { Pipe, PipeTransform } from '@angular/core';
import { Indicadores } from '../interfaces-poa/Indicadores.model';

@Pipe({
  name: 'indicadorFiltro'
})
export class IndicadorFiltroPipe implements PipeTransform {

  transform(indicadores: Array<Indicadores>, busqueda:string): Array<Indicadores> {
    const indic:Array<Indicadores> = [];
    for(const post of indicadores){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         indic.push(post);
      };
    };
    return indic;
  }
}
