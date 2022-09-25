import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // import { LoginModule } from './components/login/login.module';
  exports: [RouterModule]
})
export class AppRoutingModule { }
