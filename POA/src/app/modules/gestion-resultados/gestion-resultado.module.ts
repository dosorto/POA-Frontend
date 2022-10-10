import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionResultadoComponent } from './gestion-resultado.component';
import { FormsModule } from '@angular/forms';
const router = RouterModule.forChild([
  //{path: '/gestion', component: GestionResultadoComponent}
  
])

@NgModule({
  declarations: [

  ],
  imports: [
CommonModule,
    router,
    FormsModule 
  ]
})
export class GestionResultadoModule { }
