import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAreaComponent } from './crear-area/crear-area.component';
import { GuardarCComponent } from './componentes/guardar-c/guardar-c.component';

const routes: Routes = [
{path:'guardar-c' , component:GuardarCComponent},
{path: 'crear-area',component:CrearAreaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
