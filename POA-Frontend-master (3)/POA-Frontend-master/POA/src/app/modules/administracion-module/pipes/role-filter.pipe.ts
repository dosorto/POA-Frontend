import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../interfaces/role.model';

@Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {

  transform(dimensiones: Array<Role>, busqueda:string): Array<Role> {
    const result:Array<Role> = [];
    for(const post of dimensiones){
      if((post.rol.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.rol.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
