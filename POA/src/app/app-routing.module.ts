import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlluserComponent } from './modules/alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { CommonModule } from '@angular/common';
import { GestionResultadoComponent } from './modules/gestion-resultados/gestion-resultado.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', children:[
    {path: '',loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)}
  ]
  },
  {path: 'institucion', loadChildren: () => import('./modules/gestion-institucion/gestion-institucion.module').then(t => t.GestionInstitucionModule)},
  {path: 'dimension', loadChildren: () => import('./modules/gestion-dimension/gestion-dimension.module').then(t => t.GestionDimensionModule)},
  {path: 'area', loadChildren: () => import('./modules/area/area.module').then(t => t.AreaModule)},
  {path: 'all_user', loadChildren: () => import('./modules/alluser/alluser.module').then(t => t.UsuarioModule)},
  {path: 'empleados', loadChildren: () => import('./modules/empleado/empleado.module').then(t => t.EmpleadoModule)},
  {path: 'pei', loadChildren: () => import('./modules/pei/pei.module').then(t => t.peiModule)},
  {path: 'resultado', loadChildren: () => import('./modules/gestion-resultados/gestion-resultado.module').then(t => t.GestionResultadoModule)},
  {path:'objetivos', loadChildren: () => import('./objetivos/objetivos.modules').then(t => t.objetivosModules)},
  {path:'alluser', component:AlluserComponent},
  {path: 'forgotPassword', loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(t => t.ForgorPasswordModule)},
  {path: 'newPassword', loadChildren: () => import('./modules/new-password/new-password.module').then(t => t.newPasswordModule)},
  {path: 'changePassword', loadChildren: () => import('./modules/changepassword/changepassword.module').then(t => t.changePasswordModule)}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
