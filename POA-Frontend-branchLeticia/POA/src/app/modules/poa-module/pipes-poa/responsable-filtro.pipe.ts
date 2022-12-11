import { Pipe, PipeTransform } from '@angular/core';
<<<<<<< HEAD:POA-Frontend-branchLeticia/POA/src/app/modules/poa-module/pipes-poa/responsable-filtro.pipe.ts
import { Indicador } from '../interfaces-pei/indicadores.model'; 
=======
>>>>>>> origin/branchLeticia:POA/src/app/modules/poa-module/pipes-poa/responsable-filtro.pipe.ts

@Pipe({
  name: 'responsableFiltro'
})
export class ResponsableFiltroPipe implements PipeTransform {

<<<<<<< HEAD:POA-Frontend-branchLeticia/POA/src/app/modules/poa-module/pipes-poa/responsable-filtro.pipe.ts
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

=======
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
>>>>>>> origin/branchLeticia:POA/src/app/modules/poa-module/pipes-poa/responsable-filtro.pipe.ts
