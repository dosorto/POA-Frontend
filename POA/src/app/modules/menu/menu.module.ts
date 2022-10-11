import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { ObjetivosComponent } from 'src/app/objetivos/objetivos.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
export { AccountDetailComponent } from './account-detail/account-detail.component';
const router = RouterModule.forChild([
  {path: '', component: MenuComponent},
  {path: 'account', component:AccountDetailComponent}
]
)
@NgModule({
  declarations: [
    MenuComponent,
    //AccountDetailComponent,
  ],
  imports: [
  CommonModule,
    router,
    AccountDetailComponent
  ],
  exports : [
    CommonModule,
    //AccountDetailComponent
  ]
})
export class MenuModule { }
