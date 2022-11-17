import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
export { AccountDetailComponent } from './account-detail/account-detail.component';
import { TopBarComponent } from '../../_core/top-bar/top-bar.component';
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
    AccountDetailComponent,
    TopBarComponent
  ],
  exports : [
    CommonModule,
    //AccountDetailComponent
  ]
})
export class MenuModule { }
