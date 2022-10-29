import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './empleado.component';
import { Router, RouterModule } from '@angular/router';
const router = RouterModule.forChild([
  {path: '', component: EmpleadoComponent}
])


@NgModule({
  declarations: [EmpleadoComponent],
  imports: [
  CommonModule,
  router
  ]
})
export class EmpleadoModule { }
