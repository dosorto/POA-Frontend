import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { GestionResultadoComponent } from './gestion-resultado.component';
import { ObjetivosComponent } from './objetivos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { objToArrayPipe } from './objToArray.pipe'
import { FilterPipePipe } from './filter-pipe.pipe';
//import { PaginacionPipe } from './paginacion.pipe';

const router = RouterModule.forChild([
 {path: '', component: ObjetivosComponent}
  
])

@NgModule({
  declarations: [
ObjetivosComponent,
//objToArrayPipe,
FilterPipePipe,
//PaginacionPipe

  ],
  imports: [
CommonModule,
router,
FormsModule,
ReactiveFormsModule

  ]
})
export class objetivosModules { }