import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioModels } from './usuario.model';

@Pipe({
  name: 'paginacion'
})
export class PaginacionPipe implements PipeTransform {

  transform(usuario: Array<UsuarioModels.usuario>, steps:number, page:number): Array<UsuarioModels.usuario>{
    // solo manda la cantidad de registros (steps, 10 ejemplo)
    // y define desde donde comienza la pagina (page)
    return usuario.slice(page,page+steps);
  }

}
