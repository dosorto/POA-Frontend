import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../../poa-module/interfaces-poa/empleados.model';

@Pipe({
  name: 'empleadoFilter'
})
export class EmpleadoFilterPipe implements PipeTransform {

  transform(dimensiones: Array<Empleado>, busqueda:string): Array<Empleado> {
    const result:Array<Empleado> = [];
    for(const post of dimensiones){
      if((post.nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.nombre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
