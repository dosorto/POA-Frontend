import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { AllTareasComponent } from '../../tareas/all-tareas/all-tareas.component';
import { AllIndicadoresComponent } from '../../indicadores/all-indicadores/all-indicadores.component';
import { AllPlanificacionComponent } from '../../planificacion/all-planificacion/all-planificacion.component';
import { AllResponsableComponent } from '../../responsable/all-responsable/all-responsable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../../interfaces-poa/actividad.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { IndicadorService } from '../../../services-poa/indicador.service';

@Component({
  selector: 'app-tab-actividades-components',
  templateUrl: './tab-actividades-components.component.html',
  styleUrls: ['./tab-actividades-components.component.css']
})
export class TabActividadesComponentsComponent implements OnInit {

@ViewChild('figureContainer', {read: ViewContainerRef}) figureContainer:any;
  activeTab = 0;
  tabs = [
    {
      title: 'Tareas',
      component: AllTareasComponent
    },
    {
      title: 'Indicadores',
      component: AllIndicadoresComponent
    },
    {
      title: 'Planificación',
      component: AllPlanificacionComponent
    },
    {
      title: 'Responsables',
      component: AllResponsableComponent
    }
  ]

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
   private route:ActivatedRoute, private indicadorService:IndicadorService, private router:Router
) { }

public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
public idDepto = Number(this.route.snapshot.paramMap.get('idDepto'));
public idUE = Number(this.route.snapshot.paramMap.get('idUE'));
public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
public idActividad = Number(this.route.snapshot.paramMap.get('idActividad'));

  // public idInsti = 1;
  // public idDepto = 1;
  // public idPoa = 1;
  // public idActividad = 1;

  public actividad_seleccionada:number=this.idActividad;

  changeTab(pos:any) {
    this.activeTab = pos;
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.tabs[pos].component);
    this.figureContainer.clear();
    this.figureContainer.createComponent(factory)
    this.figureContainer.changeDetectorRef.detectChanges();
  }

  public ActividadListS : Array<Actividad> = []
  ngOnInit(): void {
    this.initData();
  }

async initData(){
  this.ActividadListS = await firstValueFrom(this.indicadorService.getActividades(this.idPoa));
  console.log("00000000"+ this.ActividadListS)

}


  selectActividad(){
    this.router.navigate(['/gestion_poa/actividad/tab/',this.actividad_seleccionada,this.idPoa,this.idUE,this.idDepto,this.idInsti]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
}
