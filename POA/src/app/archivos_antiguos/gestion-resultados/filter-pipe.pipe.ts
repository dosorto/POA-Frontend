import { Pipe, PipeTransform } from '@angular/core';
import { ResultadoModels } from './resultado.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(resultados: Array<ResultadoModels.Resultado>, busqueda:string): Array<ResultadoModels.Resultado> {
    const result:Array<ResultadoModels.Resultado> = [];
    for(const post of resultados){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
