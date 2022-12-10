import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TopBarComponent } from '../../_core/top-bar/top-bar.component';
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
import { FormsModule } from '@angular/forms';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
const router = RouterModule.forChild([
  {path: '', component: MenuComponent},
  {path: 'account', component:AccountDetailComponent}
]
)
@NgModule({
  declarations: [
    MenuComponent,
    AccountDetailComponent,
  ],
  imports: [
  
CommonModule,
    router,
    FormsModule,
    TopBarComponent,
    BackButtonComponent,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzTabsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzSelectModule
  ],
  exports : [
    CommonModule,
    //AccountDetailComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ]
})
export class MenuModule { }
