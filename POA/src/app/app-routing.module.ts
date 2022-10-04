import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAreaComponent } from './crear-area/crear-area.component';
import { GuardarCComponent } from './componentes/guardar-c/guardar-c.component';
import { AlluserComponent } from './modules/alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadChildren: () => import('./modules/login/login.module').then(t => t.LoginModule)},
  {path: 'home', loadChildren: () => import('./modules/menu/menu.module').then(t => t.MenuModule)},
  {path: 'institucion', loadChildren: () => import('./modules/gestion-institucion/gestion-institucion.module').then(t => t.GestionInstitucionModule)},
  {path: 'dimension', loadChildren: () => import('./modules/gestion-dimension/gestion-dimension.module').then(t => t.GestionDimensionModule)},
  {path: 'all_user', loadChildren: () => import('./modules/alluser/alluser.module').then(t => t.UsuarioModule)},
  {path: 'empleados', loadChildren: () => import('./modules/empleado/empleado.module').then(t => t.EmpleadoModule)},
  {path: 'area',loadChildren: () => import('./modules/area/area.module').then(t => t.AreaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
