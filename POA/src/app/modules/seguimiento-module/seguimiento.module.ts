import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguimientoComponent } from './seguimiento.component';
import { RouterModule } from '@angular/router';

const router = RouterModule.forChild([
  {path: '', component: SeguimientoComponent}
]
)

@NgModule({
  declarations: [
    SeguimientoComponent
  ],
  imports: [
    CommonModule,
    router
  ]
})
export class SeguimientoModule { }
