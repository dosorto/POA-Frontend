import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlluserComponent } from './alluser/alluser.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';

const routes: Routes = [
  {path:'alluser', component:AlluserComponent},
  {path:'objetivos', component: ObjetivosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
