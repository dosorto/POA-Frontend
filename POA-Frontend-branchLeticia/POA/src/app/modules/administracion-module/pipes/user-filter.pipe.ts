import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(dimensiones: Array<Usuario>, busqueda:string): Array<Usuario> {
    const result:Array<Usuario> = [];
    for(const post of dimensiones){
      if((post.username.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.username.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
