import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPermisosComponent } from './components/list-permisos/list-permisos.component';
import { AgregarEditarPermisoComponent } from './components/agregar-editar-permiso/agregar-editar-permiso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { SharedModule } from './shared/shared.module';
import { ListPEIComponent } from './components/list-pei/list-pei.component';
import { AllAgregarActualizarDesactivarPeiComponent } from './components/all-agregar-actualizar-desactivar-pei/all-agregar-actualizar-desactivar-pei.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPermisosComponent,
    AgregarEditarPermisoComponent,
    ListPEIComponent,
    AllAgregarActualizarDesactivarPeiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
