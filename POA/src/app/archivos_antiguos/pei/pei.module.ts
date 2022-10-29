import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionPeiComponent } from './pei.component';
import { FormsModule } from '@angular/forms';
import { PeiPipe } from './pei.pipe';
import { PaginacionPipe } from './paginacion.pipe';

const router = RouterModule.forChild([
  {path: '', component: GestionPeiComponent}
])

@NgModule({
  declarations: [
    GestionPeiComponent,
    PeiPipe,
    PaginacionPipe
  ],
  imports: [
CommonModule,
    router,
    FormsModule 
  ]
})
export class peiModule { }