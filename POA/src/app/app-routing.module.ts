import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreasPEIComponent } from './componentes/areas-pei/areas-pei.component';
import { GuardarCComponent } from './componentes/guardar-c/guardar-c.component';

const routes: Routes = [
  //{Path:'',redirectTo:/inicio,pathMacth:},
{path:'guardar-c' , component:GuardarCComponent},
{path: 'insertAreaPei', component:AreasPEIComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
