import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionInstitucionComponent } from './gestion-institucion.component';
import { FormsModule } from '@angular/forms';
import { AccountDetailComponent } from '../menu/menu.module';
import { InstitucionPipe } from './institucion.pipe';
import { PaginacionPipe } from './paginacion.pipe';
const router = RouterModule.forChild([
  {path: '', component: GestionInstitucionComponent}
])

@NgModule({
  declarations: [
    GestionInstitucionComponent,
    InstitucionPipe,
    PaginacionPipe
  ],
  imports: [
  CommonModule,
    router,
    FormsModule,
    AccountDetailComponent
  ]
})
export class GestionInstitucionModule { }
