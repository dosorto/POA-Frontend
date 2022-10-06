import { Pipe, PipeTransform } from '@angular/core';
import { DimensionModels } from './dimension.model';
@Pipe({
  name: 'dimension-filter'
})
export class DimensionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const result:Array<DimensionModels.dimension> = [];
    for(const post of value){
      if(post.titulo.indexOf(args) > -1){
         result.push(post);
      };
    };
    return result;
  }

}
