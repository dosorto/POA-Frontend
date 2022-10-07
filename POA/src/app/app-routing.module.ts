import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlluserComponent } from './modules/alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)},
  {path: 'institucion', loadChildren: () => import('./modules/gestion-institucion/gestion-institucion.module').then(t => t.GestionInstitucionModule)},
  {path: 'dimension', loadChildren: () => import('./modules/gestion-dimension/gestion-dimension.module').then(t => t.GestionDimensionModule)},
  {path: 'area', loadChildren: () => import('./modules/area/area.module').then(t => t.AreaModule)},
  {path: 'all_user', loadChildren: () => import('./modules/alluser/alluser.module').then(t => t.UsuarioModule)},
  {path: 'empleados', loadChildren: () => import('./modules/empleado/empleado.module').then(t => t.EmpleadoModule)},
  {path: 'pei', loadChildren: () => import('./modules/pei/pei.module').then(t => t.peiModule)},
  {path:'objetivos', component: ObjetivosComponent},
  {path:'alluser', component:AlluserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
