import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from 'src/app/_core/top-bar/top-bar.component';

const router = RouterModule.forChild([
  {path: '', component: MenuComponent}
])

@NgModule({
  declarations: [
    MenuComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    router
  ]
})
export class MenuModule { }
