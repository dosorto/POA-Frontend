import { NgModule } from '@angular/core';
import { NgModel, FormControl, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MisPoasModuleComponent } from './mis-poas-module.component';
import { RouterModule } from '@angular/router';
import { POAFiltroPipe } from './poafiltro.pipe';
import { POApaginacionPipe } from './poapaginacion.pipe';

import { TopBarComponent } from '../../_core/top-bar/top-bar.component'
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';

const router = RouterModule.forChild([
  { path: ':idInsti/:idUE/:idDepto', component: MisPoasModuleComponent },
])

@NgModule({
  declarations: [
    MisPoasModuleComponent,
    POAFiltroPipe,POApaginacionPipe
  ],
  imports: [
    CommonModule,
    router,
    FormsModule,
    TopBarComponent,
    BackButtonComponent
  ]
})
export class MisPoasModuleModule { 
}
