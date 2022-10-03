import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlluserComponent } from './modules/alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { CrearAreaComponent } from './components/crear-area/crear-area.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)},
  {path: 'institucion', loadChildren: () => import('./modules/gestion-institucion/gestion-institucion.module').then(t => t.GestionInstitucionModule)},
  {path: 'dimension', loadChildren: () => import('./modules/gestion-dimension/gestion-dimension.module').then(t => t.GestionDimensionModule)},
  {path: 'all_user', loadChildren: () => import('./modules/alluser/alluser.module').then(t => t.UsuarioModule)},
  {path: 'empleados', loadChildren: () => import('./modules/empleado/empleado.module').then(t => t.EmpleadoModule)},
  {path: 'recover-password',component:RecoverPasswordComponent},
{path: 'crear-area',component:CrearAreaComponent},
{path: '**',redirectTo:'', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
