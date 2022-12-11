import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
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
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(es);

import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
import { EmptyComponent } from 'src/app/_core/empty/empty.component';

import { CreateUsuarioComponent } from './components/usuarios/create-usuario/create-usuario.component';
import { UpdateUsuarioComponent } from './components/usuarios/update-usuario/update-usuario.component';
import { AllUsuarioComponent } from './components/usuarios/all-usuario/all-usuario.component';
import { DetailUsuarioComponent } from './components/usuarios/detail-usuario/detail-usuario.component';

import { DetailInstitucionComponent } from './components/institucion/detail-institucion/detail-institucion.component';
import { CreateInstitucionComponent } from './components/institucion/create-institucion/create-institucion.component';
import { AllInstitucionComponent } from './components/institucion/all-institucion/all-institucion.component';
import { UpdateInstitucionComponent } from './components/institucion/update-institucion/update-institucion.component';

import { UpdateEmpleadoComponent } from './components/empleados/update-empleado/update-empleado.component';
import { CreateEmpleadoComponent } from './components/empleados/create-empleado/create-empleado.component';
import { AllEmpleadoComponent } from './components/empleados/all-empleado/all-empleado.component';
import { DetailEmpleadoComponent } from './components/empleados/detail-empleado/detail-empleado.component';

import { DetailRolComponent } from './components/roles/detail-rol/detail-rol.component';
import { CreateRolComponent } from './components/roles/create-rol/create-rol.component';
import { UpdateRolComponent } from './components/roles/update-rol/update-rol.component';
import { AllRolComponent } from './components/roles/all-rol/all-rol.component';
import { AdministracionComponent } from './administracion.component';
import { TopBarComponent } from 'src/app/_core/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { RoleFilterPipe } from './pipes/role-filter.pipe';
import { NamesOnlyPipe } from './pipes/names-only.pipe';
import {PermisosFilterPipe} from './pipes/permisos-filter.pipe';

// enrutamiento
const router = RouterModule.forChild([
  // rutas principal
  {path: '', component: AdministracionComponent},
  // rutas de pei
  {path: 'users', component: AllUsuarioComponent},
  {path: 'roles', component: AllRolComponent},
  {path: 'instituciones', component: AllInstitucionComponent},
]);

@NgModule({
  declarations: [
    CreateUsuarioComponent,
    UpdateUsuarioComponent,
    AllUsuarioComponent,
    DetailUsuarioComponent,
    DetailInstitucionComponent,
    CreateInstitucionComponent,
    AllInstitucionComponent,
    UpdateInstitucionComponent,
    UpdateEmpleadoComponent,
    CreateEmpleadoComponent,
    AllEmpleadoComponent,
    DetailEmpleadoComponent,
    DetailRolComponent,
    CreateRolComponent,
    UpdateRolComponent,
    AllRolComponent,
    AdministracionComponent,
    UserFilterPipe,
    RoleFilterPipe,
    NamesOnlyPipe,
    PermisosFilterPipe
  ],
  imports: [
  CommonModule,
    router,
    FormsModule,
    TopBarComponent,
    BackButtonComponent,
    EmptyComponent,
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
    NzSelectModule,
    NzTransferModule,
    NzModalModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ]
})
export class AdministracionModuleModule { }
