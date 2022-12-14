import { EmptyComponent } from 'src/app/_core/empty/empty.component';
// --------------------------------
// importaciones necesarias
// --------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModel, FormControl, FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
//import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';

// --------------------------------

import { NzTabsModule } from 'ng-zorro-antd/tabs';
const ENTRYCOMPONENTS = [
  AllTareasComponent,
  AllIndicadoresComponent,
  AllPlanificacionComponent,
  AllResponsableComponent
];
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
import { CreatePoaComponent } from './components-poa/POA/create-poa/create-poa.component';
import { UpdatePoaComponent } from './components-poa/POA/update-poa/update-poa.component';
import { AllPoaComponent } from './components-poa/POA/all-poa/all-poa.component';
import { DetailPoaComponent } from './components-poa/POA/detail-poa/detail-poa.component';
import { CreateActividadComponent } from './components-poa/actividades/create-actividad-component/create-actividad.component';
import { UpdateActividadComponent } from './components-poa/actividades/update-actividad-component/update-actividad.component';
import { AllActividadComponent } from './components-poa/actividades/all-actividad-component/all-actividad-component.component';
import { DetailActividadComponent } from './components-poa/actividades/detail-actividad-component/detail-actividad-component.component';
// Pipes
import { ActividadFiltroPipe } from './pipes-poa/actividad-filtro.pipe';
import { ActividadPaginacionPipe } from './pipes-poa/actividad-paginacion.pipe';
import { AllTareasComponent } from './components-poa/tareas/all-tareas/all-tareas.component';
import { CreateTareasComponent } from './components-poa/tareas/create-tareas/create-tareas.component';
import { UpdateTareasComponent } from './components-poa/tareas/update-tareas/update-tareas.component';
import { DetailTareasComponent } from './components-poa/tareas/detail-tareas/detail-tareas.component';
import { AllIndicadoresComponent } from './components-poa/indicadores/all-indicadores/all-indicadores.component';
import { CreateIndicadoresComponent } from './components-poa/indicadores/create-indicadores/create-indicadores.component';
import { UpdateIndicadoresComponent } from './components-poa/indicadores/update-indicadores/update-indicadores.component';
import { DetailIndicadoresComponent } from './components-poa/indicadores/detail-indicadores/detail-indicadores.component';
import { SeguimientoIndicadorComponent } from './components-poa/indicadores/seguimiento-indicador/seguimiento-indicador.component';
import { DetailPlanificacionComponent } from './components-poa/planificacion/detail-planificacion/detail-planificacion.component';
import { CreatePlanificacionComponent } from './components-poa/planificacion/create-planificacion/create-planificacion.component';
import { UpdatePlanificacionComponent } from './components-poa/planificacion/update-planificacion/update-planificacion.component';
import { AllPlanificacionComponent } from './components-poa/planificacion/all-planificacion/all-planificacion.component';
import { AllResponsableComponent } from './components-poa/responsable/all-responsable/all-responsable.component';
import { POAFiltroPipe } from './pipes-poa/poafiltro.pipe';
import { POApaginacionPipe } from './pipes-poa/poapaginacion.pipe';
import { TareasPaginacionPipe } from './pipes-poa/tareas-paginacion.pipe';
import { TareasFiltroPipe } from './pipes-poa/tareas-filtro.pipe';
import { TareasFiltroHPipe } from './pipes-poa/tareah-filtro.pipe';
import { PlanificacionFiltroPipe } from './pipes-poa/planificacion-filtro.pipe';
import { PlanificacionPaginacionPipe } from './pipes-poa/planificacion-paginacion.pipe';
import { ResponsablePaginacionPipe } from './pipes-poa/responsable-paginacion.pipe';
import { ResponsableFiltroPipe } from './pipes-poa/responsable-filtro.pipe';
import { IndicadorFiltroPipe } from './pipes-poa/indicador-filtro.pipe';
import { IndicadorPaginacionPipe } from './pipes-poa/indicador-paginacion.pipe';
import { TabActividadesComponentsComponent } from './components-poa/actividades/tab-actividades-components/tab-actividades-components.component';
import { DetailPresupuestoComponent } from './components-poa/tareas/detail-presupuesto/detail-presupuesto.component';
import { PresupuestoPoaComponent } from './components-poa/POA/presupuesto-poa/presupuesto-poa.component';
import {CreateUePresupuestoComponent} from './components-poa/POA/create-ue-presupuesto/create-ue-presupuesto.component';
import {PoaDeptosComponent} from'./components-poa/POA/poa-deptos/poa-deptos.component'

import { ResultadosFiltroPipe } from './pipes-poa/resultados-filtro.pipe';

// enrutamiento
const router = RouterModule.forChild([
  // rutas principal
  {path: '', component: PresupuestoPoaComponent},


  // rutas de poa
  {path: 'poa/create/:idInsti/:idUE/:idDepto/:idPresupuesto/:anio', component: CreatePoaComponent},
  {path: 'poa/update/:id/:idInsti/:idUE/:idDepto/:anio', component: UpdatePoaComponent},
  {path: 'poa/detail/:id/:idInsti/:idUE/:idDepto/:idPresupuesto/:anio', component: DetailPoaComponent},
  {path: 'poa/list/:idInsti/:idUE/:idDepto', component: AllPoaComponent},
  {path: 'ue_presupuesto/crear', component: CreateUePresupuestoComponent},
  {path: 'poas/crear_poa_deptos/:id', component: PoaDeptosComponent},
  // rutas de actividades
  {path: 'actividad/create/:idPoa/:idInsti/:idDepto/:idUE', component: CreateActividadComponent},
  {path: 'actividad/update/:id/:idPoa/:idInsti/:idDepto/:idUE', component: UpdateActividadComponent},
  {path: 'actividad/detail/:id/:idPoa/:idInsti/:idDepto/:idUE', component: DetailActividadComponent},
  {path: 'actividad/list/:idPoa/:idInsti/:idDepto/:idUE', component: AllActividadComponent},
  {path: 'actividad/tab/:idActividad/:idPoa/:idDepto/:idInsti', component: TabActividadesComponentsComponent},
  // rutas de tareas
  {path: 'tareas/create/:idActividad/:idPoa/:idDepto/:idInsti', component: CreateTareasComponent},
  {path: 'tareas/update/:id/:idActividad/:idPoa/:idDepto/:idInsti', component: UpdateTareasComponent},
  {path: 'tareas/detail/:id/:idActividad/:idPoa/:idDepto/:idInsti', component: DetailTareasComponent},
  {path: 'tareas/list/:idActividad/:idPoa/:idDepto/:idInsti', component: AllTareasComponent},

  // rutas de indicadores
  {path: 'indicadores/create/:idActividad/:idPoa/:idDepto/:idInsti', component: CreateIndicadoresComponent},
  {path: 'indicadores/update/:id/:idActividad/:idPoa/:idDepto/:idInsti', component: UpdateIndicadoresComponent},
  {path: 'indicadores/detail/:id/:idActividad/:idPoa/:idDepto/:idInsti', component: DetailIndicadoresComponent},
  {path: 'indicadores/list/:idActividad/:idPoa/:idDepto/:idInsti', component: AllIndicadoresComponent},
  {path: 'indicadores/seguimiento/:id/:idPoa/:idActividad', component: SeguimientoIndicadorComponent},

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
    TareasFiltroHPipe,
    PlanificacionFiltroPipe,
    PlanificacionPaginacionPipe,
    ResponsablePaginacionPipe,
    ResponsableFiltroPipe,
    IndicadorFiltroPipe,
    IndicadorPaginacionPipe,
    SeguimientoIndicadorComponent,
    TabActividadesComponentsComponent,
    DetailPresupuestoComponent,
    ENTRYCOMPONENTS,
    PresupuestoPoaComponent,
    CreateUePresupuestoComponent,
    PoaDeptosComponent,
    ResultadosFiltroPipe

  ],
  imports: [

    NgSelectModule,
    BackButtonComponent,
  CommonModule,
  router,
  MatSelectModule,
  FormsModule,
  TopBarComponent,
BackButtonComponent,
MatSlideToggleModule,
MatAutocompleteModule,
MatFormFieldModule,
MatInputModule,
MatRadioModule,
BackButtonComponent,
MatIconModule,
MatButtonModule,
NzTabsModule,
EmptyComponent,
MatProgressBarModule,
MatTabsModule,
MatExpansionModule,
NzPopoverModule,
NzDatePickerModule,
NzTableModule,
NzTreeSelectModule

  ],
  entryComponents: [ENTRYCOMPONENTS],
  exports:[
    AllActividadComponent
  ]
})
export class PoaModuleModule { }
