import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from 'src/app/_core/top-bar/top-bar.component';
import { SidebarComponent } from 'src/app/_core/sidebar/sidebar.component';

const router = RouterModule.forChild([
  {path: '', component: MenuComponent}
])

@NgModule({
  declarations: [
    MenuComponent,
    TopBarComponent,
    SidebarComponent
  ],
  imports: [
  CommonModule,
    router
  ]
})
export class MenuModule { }
