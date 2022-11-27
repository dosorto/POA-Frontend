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
import { AllActividadComponent } from './components-poa/actividades/all-actividad-component/all-actividad-component.component';
import { DetailActividadComponent } from './components-poa/actividades/detail-actividad-component/detail-actividad-component.component';
// Pipes
import { ActividadFiltroPipe } from './pipes-poa/actividad-filtro.pipe';
import { ActividadPaginacionPipe } from './pipes-poa/actividad-paginacion.pipe';
import { CreatePoaComponent } from './components-poa/POA/create-poa/create-poa.component';
import { UpdatePoaComponent } from './components-poa/POA/update-poa/update-poa.component';
import { AllPoaComponent } from './components-poa/POA/all-poa/all-poa.component';
import { DetailPoaComponent } from './components-poa/POA/detail-poa/detail-poa.component';
import { AllTareasComponent } from './components-poa/tareas/all-tareas/all-tareas.component';
import { CreateTareasComponent } from './components-poa/tareas/create-tareas/create-tareas.component';
import { UpdateTareasComponent } from './components-poa/tareas/update-tareas/update-tareas.component';
import { DetailTareasComponent } from './components-poa/tareas/detail-tareas/detail-tareas.component';
import { AllIndicadoresComponent } from './components-poa/indicadores/all-indicadores/all-indicadores.component';
import { CreateIndicadoresComponent } from './components-poa/indicadores/create-indicadores/create-indicadores.component';
import { UpdateIndicadoresComponent } from './components-poa/indicadores/update-indicadores/update-indicadores.component';
import { DetailIndicadoresComponent } from './components-poa/indicadores/detail-indicadores/detail-indicadores.component';
import { DetailPlanificacionComponent } from './components-poa/planificacion/detail-planificacion/detail-planificacion.component';
import { CreatePlanificacionComponent } from './components-poa/planificacion/create-planificacion/create-planificacion.component';
import { UpdatePlanificacionComponent } from './components-poa/planificacion/update-planificacion/update-planificacion.component';
import { AllPlanificacionComponent } from './components-poa/planificacion/all-planificacion/all-planificacion.component';
import { AllResponsableComponent } from './components-poa/responsable/all-responsable/all-responsable.component';
import { POAFiltroPipe } from './pipes-poa/poafiltro.pipe';
import { POApaginacionPipe } from './pipes-poa/poapaginacion.pipe';
import { TareasPaginacionPipe } from './pipes-poa/tareas-paginacion.pipe';
import { TareasFiltroPipe } from './pipes-poa/tareas-filtro.pipe';
import { PlanificacionFiltroPipe } from './pipes-poa/planificacion-filtro.pipe';
import { PlanificacionPaginacionPipe } from './pipes-poa/planificacion-paginacion.pipe';
import { ResponsablePaginacionPipe } from './pipes-poa/responsable-paginacion.pipe';
import { ResponsableFiltroPipe } from './pipes-poa/responsable-filtro.pipe';
import { IndicadorFiltroPipe } from './pipes-poa/indicador-filtro.pipe';
import { IndicadorPaginacionPipe } from './pipes-poa/indicador-paginacion.pipe';



// enrutamiento
const router = RouterModule.forChild([
  // rutas principal
  {path: '', component: GestionPoasComponent},


  // rutas de poa
  {path: 'poa/create/:idInsti/:idDepto', component: CreatePoaComponent},
  {path: 'poa/update/:id/:idInsti/:idDepto', component: UpdatePoaComponent},
  {path: 'poa/detail/:id/:idInsti/:idDepto', component: DetailPoaComponent},
  {path: 'poa/list/:idInsti/:idDepto', component: AllPoaComponent},
  // rutas de actividades
  {path: 'actividad/create/:idObjetivo', component: CreateActividadComponent},
  {path: 'actividad/update/:id/:idObjetivo', component: UpdateActividadComponent},
  {path: 'actividad/detail/:id/:idObjetivo', component: DetailActividadComponent},
  {path: 'actividad/list/:idObjetivo', component: AllActividadComponent},

  // rutas de tareas
  {path: 'tareas/create/:idPoa/:idActividad/:idInsti/:idDepto', component: CreateTareasComponent},
  {path: 'tareas/update/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: UpdateTareasComponent},
  {path: 'tareas/detail/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: DetailTareasComponent},
  {path: 'tareas/list/:idActividad/:idPoa/:idInsti/:idDepto', component: AllTareasComponent},

  // rutas de indicadores
  {path: 'indicadores/create/:idPoa/:idActividad/:idInsti/:idDepto', component: CreateIndicadoresComponent},
  {path: 'indicadores/update/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: UpdateIndicadoresComponent},
  {path: 'indicadores/detail/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: DetailIndicadoresComponent},
  {path: 'indicadores/list/:idActividad/:idPoa/:idInsti/:idDepto', component: AllIndicadoresComponent},
  // rutas de planificacion
  {path: 'planificacion/create/:idPoa/:idActividad/:idInsti/:idDepto', component: CreatePlanificacionComponent},
  {path: 'planificacion/update/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: UpdatePlanificacionComponent},
  {path: 'planificacion/detail/:id/:idPoa/:idActividad/:idInsti/:idDepto', component: DetailPlanificacionComponent},
  {path: 'planificacion/list/:idActividad/:idPoa/:idInsti/:idDepto', component: AllPlanificacionComponent},
  

])

@NgModule({
  declarations: [GestionPoasComponent,

    ActividadFiltroPipe,
    ActividadPaginacionPipe,

    CreateActividadComponent,
    UpdateActividadComponent,
    DetailActividadComponent,
    AllActividadComponent,
    CreatePoaComponent,
    UpdatePoaComponent,
    AllPoaComponent,
    DetailPoaComponent,
    AllTareasComponent,
    CreateTareasComponent,
    UpdateTareasComponent,
    DetailTareasComponent,
    AllIndicadoresComponent,
    CreateIndicadoresComponent,
    UpdateIndicadoresComponent,
    DetailIndicadoresComponent,
    DetailPlanificacionComponent,
    CreatePlanificacionComponent,
    UpdatePlanificacionComponent,
    AllPlanificacionComponent,
    AllResponsableComponent,
    POAFiltroPipe,
    POApaginacionPipe,
    TareasPaginacionPipe,
    TareasFiltroPipe,
    PlanificacionFiltroPipe,
    PlanificacionPaginacionPipe,
    ResponsablePaginacionPipe,
    ResponsableFiltroPipe,
    IndicadorFiltroPipe,
    IndicadorPaginacionPipe

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
