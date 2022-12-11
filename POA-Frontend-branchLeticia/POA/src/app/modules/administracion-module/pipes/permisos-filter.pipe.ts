import { Pipe, PipeTransform } from '@angular/core';
import { Permiso } from '../interfaces/permiso.model';
import { TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';

@Pipe({
  name: 'permisosFilter'
})
export class PermisosFilterPipe implements PipeTransform {

  transform(permisos: Array<Permiso>):Array<TransferItem> {
    const result:Array<TransferItem> = [];
    for (let i = 0; i < permisos.length; i++) {
        result.push({
          key: permisos[i].id.toString(),
          title: permisos[i].Permiso,
          disabled: false
        });
      }
    return result;
  }

}