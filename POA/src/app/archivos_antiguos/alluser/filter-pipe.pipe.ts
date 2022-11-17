import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioModels } from './usuario.model';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(usuario: Array<UsuarioModels.usuario>, busqueda:string): Array<UsuarioModels.usuario> {
    const result:Array<UsuarioModels.usuario> = [];
    for(const post of usuario){
      if((post.username.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.username.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
