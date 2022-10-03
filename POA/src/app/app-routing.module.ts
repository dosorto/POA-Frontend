import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertPEIComponent } from './components/new-pei/new-pei.component';
import { DisablePEIComponent } from './components/disable-pei/disable-pei.component';
import { AllPEIComponent } from './components/all-pei/all-pei.component';

const routes: Routes = [
  {path: 'insertPEI', component: InsertPEIComponent},
  {path: 'disablePEI', component: DisablePEIComponent},
  {path: 'allPEI', component: AllPEIComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
