import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from 'src/app/_core/top-bar/top-bar.component';
import { SidebarComponent } from 'src/app/_core/sidebar/sidebar.component';
import { ObjetivosComponent } from 'src/app/objetivos/objetivos.component';

const router = RouterModule.forChild([
  {path: '', component: MenuComponent}
])

@NgModule({
  declarations: [
    MenuComponent,
    TopBarComponent,
    SidebarComponent,
    ObjetivosComponent
  ],
  imports: [
  CommonModule,
    router
  ]
})
export class MenuModule { }
