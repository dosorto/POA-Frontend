import { Pipe, PipeTransform } from '@angular/core';
import { Resultado } from 'src/app/modules/gestion-pei-module/interfaces-pei/resultado.model';

@Pipe({
  name: 'resultadosFiltro'
})
export class ResultadosFiltroPipe implements PipeTransform {

  transform(resultados: Array<Resultado>, busqueda:string): Array<Resultado> {
    const result:Array<Resultado> = [];
    for(const post of resultados){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}
