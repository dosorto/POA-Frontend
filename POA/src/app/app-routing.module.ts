import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./modules/login-module/login.module').then(t => t.LoginModule) },
  {
    path: 'home', children: [
      { path: '', loadChildren: () => import('./modules/menu-module/menu.module').then(t => t.MenuModule) }
    ]
  },

  {
    path: 'gestion_poa', children: [
      { path: '', loadChildren: () => import('./modules/poa-module/poa-module.module').then(t => t.PoaModuleModule) }
    ]
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
