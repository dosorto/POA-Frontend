import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../../_core/top-bar/top-bar.component'
import { RouterModule } from '@angular/router';
import { GestionPeisComponent } from './gestion-peis.component';
import { NgModel, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'

const router = RouterModule.forChild([
  {path: '', component: GestionPeisComponent},
])

@NgModule({
  declarations: [GestionPeisComponent],
  imports: [
  
CommonModule,
  TopBarComponent,
  router,
  MatSelectModule
  ]
})
export class GestionPeiModule { }
