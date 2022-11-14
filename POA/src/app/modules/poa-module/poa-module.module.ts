// --------------------------------
// importaciones necesarias
// --------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel, FormControl, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'
// --------------------------------
// componentes independientes importados
// --------------------------------
import { TopBarComponent } from '../../_core/top-bar/top-bar.component'
// --------------------------------
// pipes del modulo
// --------------------------------

// --------------------------------
// componentes propios del modulo
// --------------------------------
// componente padre:
import { GestionPoasComponent } from './poa-module.component';
// componentes hijos:
import { CreateActividadComponent } from './components-poa/actividades/create-actividad-component/create-actividad.component';
import { UpdateActividadComponent } from './components-poa/actividades/update-actividad-component/update-actividad.component';
import { DeleteActividadComponent } from './components-poa/actividades/delete-actividad-component/delete-actividad-component.component';
import { AllActividadComponent } from './components-poa/actividades/all-actividad-component/all-actividad-component.component';
import { DetailActividadComponent } from './components-poa/actividades/detail-actividad-component/detail-actividad-component.component';
// Pipes
import { ActividadFiltroPipe } from './pipes-poa/actividad-filtro.pipe';
import { ActividadPaginacionPipe } from './pipes-poa/actividad-paginacion.pipe';



// enrutamiento
const router = RouterModule.forChild([
  // rutas principal
  {path: '', component: GestionPoasComponent},

  // rutas de areas
  {path: 'actividad/create/:idObjetivo', component: CreateActividadComponent},
  {path: 'actividad/update/:id/:idObjetivo', component: UpdateActividadComponent},
  {path: 'actividad/delete/:id', component: DeleteActividadComponent},
  {path: 'actividad/detail/:id/:idObjetivo', component: DetailActividadComponent},
  {path: 'actividad/list/:idObjetivo', component: AllActividadComponent},

  

])

@NgModule({
  declarations: [GestionPoasComponent,

    ActividadFiltroPipe,
    ActividadPaginacionPipe,

    CreateActividadComponent,
    UpdateActividadComponent,
    DeleteActividadComponent,
    DetailActividadComponent,
    AllActividadComponent

  ],
  imports: [

CommonModule,
  router,
  MatSelectModule,
  FormsModule,
  TopBarComponent
  ]
})
export class PoaModuleModule { }
