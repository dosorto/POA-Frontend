import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionResultadoComponent } from './gestion-resultado.component';
import { FormsModule } from '@angular/forms';
import { objToArrayPipe } from './objToArray.pipe'
import { FilterPipePipe } from './filter-pipe.pipe';
import { PaginacionPipe } from './paginacion.pipe';

const router = RouterModule.forChild([
 {path: '', component: GestionResultadoComponent}
  
])

@NgModule({
  declarations: [
GestionResultadoComponent,
objToArrayPipe,
FilterPipePipe,
PaginacionPipe

  ],
  imports: [
CommonModule,
router,
FormsModule

  ]
})
export class GestionResultadoModule { }
