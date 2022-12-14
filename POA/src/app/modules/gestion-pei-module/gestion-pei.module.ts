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
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
import { EmptyComponent } from 'src/app/_core/empty/empty.component';
// --------------------------------
// pipes del modulo
// --------------------------------
import { DimensionPipe } from './pipes-pei/dimension-filtro-tabla.pipe';
import { PaginacionPipe } from './pipes-pei/dimension-paginacion.pipe';
// --------------------------------
// componentes propios del modulo
// --------------------------------
// componente padre:
import { GestionPeisComponent } from './gestion-peis.component';
// componentes hijos:
import { PeiCreateComponent } from './components-pei/pei/pei-create/pei-create.component';
import { UpdatePeiComponent } from './components-pei/pei/update-pei/update-pei.component';
import { DeletePeiComponent } from './components-pei/pei/delete-pei/delete-pei.component';
import { AllPeiComponent } from './components-pei/pei/all-pei/all-pei.component';
import { DetailPeiComponent } from './components-pei/pei/detail-pei/detail-pei.component';
import { CreateDimensionComponent } from './components-pei/dimension/create-dimension-component/create-dimension.component';
import { UpdateDimensionComponent } from './components-pei/dimension/update-dimension-component/update-dimension.component';
import { DeleteDimensionComponent } from './components-pei/dimension/delete-dimension-component/delete-dimension.component';
import { AllDimensionComponent } from './components-pei/dimension/all-dimension-component/all-dimension.component';
import { DetailDimensionComponent } from './components-pei/dimension/detail-dimension-component/detail-dimension.component';
import { CreateAreaComponent } from './components-pei/areas/create-area-component/create-area.component';
import { UpdateAreaComponent } from './components-pei/areas/update-area-component/update-area.component';
import { DeleteAreaComponentComponent } from './components-pei/areas/delete-area-component/delete-area-component.component';
import { AllAreaComponentComponent } from './components-pei/areas/all-area-component/all-area-component.component';
import { DetailAreaComponentComponent } from './components-pei/areas/detail-area-component/detail-area-component.component';
import { CreateIndicadorComponentComponent } from './components-pei/indicadores/create-indicador-component/create-indicador-component.component';
import { UpdateIndicadorComponentComponent } from './components-pei/indicadores/update-indicador-component/update-indicador-component.component';
import { DeleteIndicadorComponentComponent } from './components-pei/indicadores/delete-indicador-component/delete-indicador-component.component';
import { AllIndicadorComponentComponent } from './components-pei/indicadores/all-indicador-component/all-indicador-component.component';
import { DetailIndicadorComponentComponent } from './components-pei/indicadores/detail-indicador-component/detail-indicador-component.component';
import { CreateObjetivoComponentComponent } from './components-pei/objetivos/create-objetivo-component/create-objetivo-component.component';
import { UpdateObjetivoComponentComponent } from './components-pei/objetivos/update-objetivo-component/update-objetivo-component.component';
import { DeleteObjetivoComponentComponent } from './components-pei/objetivos/delete-objetivo-component/delete-objetivo-component.component';
import { AllObjetivoComponentComponent } from './components-pei/objetivos/all-objetivo-component/all-objetivo-component.component';
import { DetailObjetivoComponentComponent } from './components-pei/objetivos/detail-objetivo-component/detail-objetivo-component.component';
import { DetailResultadoComponentComponent } from './components-pei/resultados/detail-resultado-component/detail-resultado-component.component';
import { CreateResultadoComponentComponent } from './components-pei/resultados/create-resultado-component/create-resultado-component.component';
import { UpdateResultadoComponentComponent } from './components-pei/resultados/update-resultado-component/update-resultado-component.component';
import { DeleteResultadoComponentComponent } from './components-pei/resultados/delete-resultado-component/delete-resultado-component.component';
import { AllResultadoComponentComponent } from './components-pei/resultados/all-resultado-component/all-resultado-component.component';

// Pipes
import { PeiFiltroPipe } from './pipes-pei/pei-filtro.pipe';
import { PeiPaginacionPipe } from './pipes-pei/pei-paginacion.pipe';
import { ObjetivosPaginacionPipe } from './pipes-pei/objetivos-paginacion.pipe';
import { ObjetivosFiltroPipe } from './pipes-pei/objetivos-filtro.pipe';
import { AreasFiltroPipe } from './pipes-pei/areas-filtro.pipe';
import { AreasPaginacionPipe } from './pipes-pei/areas-paginacion.pipe';
import { ResultadosPaginacionPipe } from './pipes-pei/resultados-paginacion.pipe';
import { ResultadosFiltroPipe } from './pipes-pei/resultados-filtro.pipe';
import { IndicadoresFiltroPipe } from './pipes-pei/indicadores-filtro.pipe';
import { IndicadoresPaginacionPipe } from './pipes-pei/indicadores-paginacion.pipe';


// enrutamiento
const router = RouterModule.forChild([
  // rutas principal
  {path: '', component: GestionPeisComponent},
  // rutas de pei
  {path: 'pei/create/:idInsti', component: PeiCreateComponent},
  {path: 'pei/update/:id/:idInsti', component: UpdatePeiComponent},
  {path: 'pei/delete/:id', component: DeletePeiComponent},
  {path: 'pei/detail/:id/:idInsti', component: DetailPeiComponent},
  {path: 'pei/list/:idInsti', component: AllPeiComponent},
  // rutas de dimension
  {path: 'dimension/create/:idPei/:idInsti', component: CreateDimensionComponent},
  {path: 'dimension/update/:id/:idPei/:idInsti', component: UpdateDimensionComponent},
  {path: 'dimension/delete/:id', component: DeleteDimensionComponent},
  {path: 'dimension/detail/:id/:idPei/:idInsti', component: DetailDimensionComponent},
  {path: 'dimension/list/:idPei/:idInsti', component: AllDimensionComponent},

  // rutas de objetivos
  {path: 'objetivos/create/:idDimension/:idPei/:idInsti', component: CreateObjetivoComponentComponent},
  {path: 'objetivos/update/:id/:idDimension/:idPei/:idInsti', component: UpdateObjetivoComponentComponent},
  {path: 'objetivos/delete/:id/', component: DeleteObjetivoComponentComponent},
  {path: 'objetivos/detail/:id/:idDimension/:idPei/:idInsti', component: DetailObjetivoComponentComponent},
  {path: 'objetivos/list/:idDimension/:idPei/:idInsti', component: AllObjetivoComponentComponent},

  // rutas de areas
  {path: 'areas/create/:idObjetivo/:idDimension/:idPei/:idInsti', component: CreateAreaComponent},
  {path: 'areas/update/:id/:idObjetivo/:idDimension/:idPei/:idInsti', component: UpdateAreaComponent},
  {path: 'areas/delete/:id', component: DeleteAreaComponentComponent},
  {path: 'areas/detail/:id/:idObjetivo/:idDimension/:idPei/:idInsti', component: DetailAreaComponentComponent},
  {path: 'areas/list/:idObjetivo/:idDimension/:idPei/:idInsti', component: AllAreaComponentComponent},

  // rutas de resultados
  {path: 'resultados/create/:idArea/:idObjetivo/:idDimension/:idPei/:idInsti', component: CreateResultadoComponentComponent},
  {path: 'resultados/update/:id/:idArea/:idObjetivo/:idDimension/:idPei/:idInsti', component: UpdateResultadoComponentComponent},
  {path: 'resultados/delete/:id', component: DeleteResultadoComponentComponent},
  {path: 'resultados/detail/:id/:idArea/:idObjetivo/:idDimension/:idPei/:idInsti', component: DetailResultadoComponentComponent},
  {path: 'resultados/list/:idArea/:idObjetivo/:idDimension/:idPei/:idInsti', component: AllResultadoComponentComponent},

  // rutas de indicadores
  {path: 'indicadores/create/:idResultado', component: CreateIndicadorComponentComponent},
  {path: 'indicadores/update/:id/:idResultado', component: UpdateIndicadorComponentComponent},
  {path: 'indicadores/delete/:id', component: DeleteIndicadorComponentComponent},
  {path: 'indicadores/detail/:id', component: DetailIndicadorComponentComponent},
  {path: 'indicadores/list/:idResult', component: AllIndicadorComponentComponent},
])

@NgModule({
  declarations: [GestionPeisComponent,
    DimensionPipe,
    PaginacionPipe,
    CreateDimensionComponent,
    UpdateDimensionComponent,
    DeleteDimensionComponent,
    AllDimensionComponent,
    DetailDimensionComponent,
    CreateAreaComponent,
    UpdateAreaComponent,
    DeleteAreaComponentComponent,
    AllAreaComponentComponent,
    DetailAreaComponentComponent,
    CreateIndicadorComponentComponent,
    UpdateIndicadorComponentComponent,
    DeleteIndicadorComponentComponent,
    AllIndicadorComponentComponent,
    DetailIndicadorComponentComponent,
    CreateObjetivoComponentComponent,
    UpdateObjetivoComponentComponent,
    DeleteObjetivoComponentComponent,
    AllObjetivoComponentComponent,
    DetailObjetivoComponentComponent,
    DetailResultadoComponentComponent,
    CreateResultadoComponentComponent,
    UpdateResultadoComponentComponent,
    DeleteResultadoComponentComponent,
    AllResultadoComponentComponent,
    PeiFiltroPipe,
    PeiPaginacionPipe,
    ObjetivosPaginacionPipe,
    ObjetivosFiltroPipe,
    AreasFiltroPipe,
    AreasPaginacionPipe,
    ResultadosPaginacionPipe,
    ResultadosFiltroPipe,
    IndicadoresFiltroPipe,
    IndicadoresPaginacionPipe,
    PeiCreateComponent,
    UpdatePeiComponent,
    DeletePeiComponent,
    AllPeiComponent,
    DetailPeiComponent
  ],
  imports: [

CommonModule,
  router,
  MatSelectModule,
  FormsModule,
  TopBarComponent,
  BackButtonComponent,
  EmptyComponent
  ]
})
export class GestionPeiModule { }
