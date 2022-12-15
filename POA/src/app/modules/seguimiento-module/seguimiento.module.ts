import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguimientoComponent } from './seguimiento.component';
import { RouterModule } from '@angular/router';
import { NgModel, FormControl, FormsModule} from '@angular/forms';

import { TopBarComponent } from '../../_core/top-bar/top-bar.component'
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';

const router = RouterModule.forChild([
  {path: ':idPoa/:idActividad', component: SeguimientoComponent}
]
)

@NgModule({
  declarations: [
    SeguimientoComponent
  ],
  imports: [
    CommonModule,
    router,
    FormsModule,
    TopBarComponent,
    BackButtonComponent,
  ]
})
export class SeguimientoModule { }
