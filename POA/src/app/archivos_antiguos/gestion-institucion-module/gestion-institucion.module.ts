import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionInstitucionComponent } from './gestion-institucion.component';
import { FormsModule } from '@angular/forms';
import { AccountDetailComponent } from '../../modules/menu-module/menu.module';
import { InstitucionPipe } from './institucion.pipe';
import { PaginacionPipe } from './paginacion.pipe';
import { MatSelectModule } from '@angular/material/select';
import { TopBarComponent } from '../../_core/top-bar/top-bar.component';
import { gestionInstitucionPipe } from './gestion-institucion.pipe';
const router = RouterModule.forChild([
  { path: '', component: GestionInstitucionComponent }
])

@NgModule({
  declarations: [
    GestionInstitucionComponent,
    InstitucionPipe,
    PaginacionPipe,
    gestionInstitucionPipe
  ],
  imports: [
    CommonModule,
    router,
    FormsModule,
    AccountDetailComponent,
    TopBarComponent,
    MatSelectModule
  ]
})
export class GestionInstitucionModule { }
