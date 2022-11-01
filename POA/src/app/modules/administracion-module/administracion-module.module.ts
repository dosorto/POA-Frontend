import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AdministracionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdministracionModuleModule { }
