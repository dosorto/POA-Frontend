import { Planificacion } from './../interfaces-poa/planificacion.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planificacionFiltro'
})
export class PlanificacionFiltroPipe implements PipeTransform {

  transform(planificaciones: Array<Planificacion>, busqueda:string): Array<Planificacion> {
    const result:Array<Planificacion> = [];
    for(const post of planificaciones){
      if((post.trimestre.toLocaleLowerCase().includes(busqueda.toLowerCase())) || (post.trimestre.toUpperCase().includes(busqueda.toUpperCase()))){
         result.push(post);
      };
    };
    return result;
  }

}
