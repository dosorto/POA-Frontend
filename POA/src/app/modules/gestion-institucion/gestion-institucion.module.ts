import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionInstitucionComponent } from './gestion-institucion.component';
import { FormsModule } from '@angular/forms';
import { AccountDetailComponent } from '../menu/menu.module';
const router = RouterModule.forChild([
  {path: '', component: GestionInstitucionComponent}
])

@NgModule({
  declarations: [
    GestionInstitucionComponent
  ],
  imports: [
  CommonModule,
    router,
    FormsModule,
    AccountDetailComponent
  ]
})
export class GestionInstitucionModule { }
