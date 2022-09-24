import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPermisosComponent } from './components/list-permisos/list-permisos.component';
import { AgregarEditarPermisoComponent } from './components/agregar-editar-permiso/agregar-editar-permiso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ListPermisosComponent,
    AgregarEditarPermisoComponent
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
