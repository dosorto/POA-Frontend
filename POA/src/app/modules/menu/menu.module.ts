import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { ObjetivosComponent } from 'src/app/objetivos/objetivos.component';
const router = RouterModule.forChild([
  {path: '', component: MenuComponent}
])
@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
  CommonModule,
    router
  ]
})
export class MenuModule { }
