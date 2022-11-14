import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlanificacionComponent } from './modules/administracion-module/components/planificacion/all-planificacion/all-planificacion.component';
import { CreatePlanificacionComponent } from './modules/administracion-module/components/planificacion/create-planificacion/create-planificacion.component';

const routes: Routes = [
  {path: 'home/all/planificacion', component: AllPlanificacionComponent},
  {path: 'home/create/planificacion', component: CreatePlanificacionComponent},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', loadChildren: () => import('./modules/login-module/login.module').then(t => t.LoginModule)},
  {path: 'home', children:[
    {path: '',loadChildren: () => import('./modules/menu-module/menu.module').then(t => t.MenuModule)}
  ]
  },
  {path: 'gestion_pei', children:[
    {path: '', loadChildren: () => import('./modules/gestion-pei-module/gestion-pei.module').then(t=>t.GestionPeiModule)}
  ]}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
