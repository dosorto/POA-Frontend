import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertPEIComponent } from './components/new-pei/new-pei.component';
import { DisablePEIComponent } from './components/disable-pei/disable-pei.component';

const routes: Routes = [
  {path: 'insertPEI', component: InsertPEIComponent},
  {path: 'disablePEI', component: DisablePEIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
