import { NgModule } from '@angular/core';
import { NgModel, FormControl, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MisPoasModuleComponent } from './mis-poas-module.component';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../_core/top-bar/top-bar.component'
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';

const router = RouterModule.forChild([
  { path: '', component: MisPoasModuleComponent },

  { path: 'mipoa/list', component: MisPoasModuleComponent },
])

@NgModule({
  declarations: [
    MisPoasModuleComponent,
  ],
  imports: [
    CommonModule,
    router,
    FormsModule,
    TopBarComponent,
    BackButtonComponent,
  ]
})
export class MisPoasModuleModule { 

}
