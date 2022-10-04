// Se creo un componente para convertir los objetos en arrays
// Se creo un componente para convertirl los objetos en arrays
import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
    name: 'objToArray'
})

export class objToArrayPipe implements PipeTransform{

    transform(object: any []): any {
        return Object.values(object);
    }
}
