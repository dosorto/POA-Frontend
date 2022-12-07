import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', loadChildren: () => import('./modules/login-module/login.module').then(t => t.LoginModule)},
  {path: 'home', children:[
    {path: '',loadChildren: () => import('./modules/menu-module/menu.module').then(t => t.MenuModule)}
  ]
  },

  {
    path: 'gestion_poa', children: [
      { path: '', loadChildren: () => import('./modules/poa-module/poa-module.module').then(t => t.PoaModuleModule) }
    ]
  },
  {
    path: 'gestion_pei', children: [
      {path: '', loadChildren: () => import('./modules/gestion-pei-module/gestion-pei.module').then(t=>t.GestionPeiModule)}
    ]
  },
  {
    path: 'admin', children: [
      {path: '', loadChildren: () => import('./modules/administracion-module/administracion-module.module').then(t=>t.AdministracionModuleModule)}
    ]
  },
  {
    path: 'reportes', children: [
      {path: '', loadChildren: () => import('./modules/reportes-module/reportes-module.module').then(t=>t.ReportesModuleModule)}
    ]
  },
  {
    path: 'revision', children: [
      {path: '', loadChildren: () => import('./modules/revision-module/revision.module').then(t=>t.RevisionModule)}
    ]
  },
  {
    path: 'mis_poas', children: [
      {path: '', loadChildren: () => import('./modules/mis-poas-module/mis-poas-module.module').then(t=>t.MisPoasModuleModule)}
    ]
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
