import { Pipe, PipeTransform } from '@angular/core';
import { TareasH} from '../interfaces-poa/tareas_historico.model'

@Pipe({
  name: 'tareasFiltroH'
})
export class TareasFiltroHPipe implements PipeTransform {

  transform(tareas: Array<TareasH>, busqueda:string): Array<TareasH> {
    const result:Array<TareasH> = [];
    for(const post of tareas){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }
}
