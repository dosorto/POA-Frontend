import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionDimensionComponent } from './gestion-dimension.component';
import { FormsModule } from '@angular/forms';
import { DimensionPipe } from './dimension.pipe';
const router = RouterModule.forChild([
  {path: '', component: GestionDimensionComponent}
])

@NgModule({
  declarations: [
    GestionDimensionComponent,
    DimensionPipe
  ],
  imports: [
CommonModule,
    router,
    FormsModule 
  ]
})
export class GestionDimensionModule { }
