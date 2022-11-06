import { Pipe, PipeTransform } from '@angular/core';
import { Indicador } from '../interfaces-pei/indicadores.model'; 

@Pipe({
  name: 'indicadoresFiltro'
})
export class IndicadoresFiltroPipe implements PipeTransform {

  transform(indicadores: Array<Indicador>, busqueda:string): Array<Indicador> {
    const indicador:Array<Indicador> = [];
    for(const post of indicadores){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         indicador.push(post);
      };
    };
    return indicador;
  }
}

