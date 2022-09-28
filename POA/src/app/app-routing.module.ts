import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlluserComponent } from './alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
