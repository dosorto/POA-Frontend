import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './area.component';
import { FormsModule } from '@angular/forms';
import { AreaPipe } from './area.pipe';
import { PaginacionPipe } from './paginacion.pipe';
const router = RouterModule.forChild([
  {path: '', component: AreaComponent}
])

@NgModule({
  declarations: [
    AreaComponent,
    AreaPipe,
    PaginacionPipe
  ],
  imports: [
CommonModule,
    router,
    FormsModule 
  ]
})
export class AreaModule { }