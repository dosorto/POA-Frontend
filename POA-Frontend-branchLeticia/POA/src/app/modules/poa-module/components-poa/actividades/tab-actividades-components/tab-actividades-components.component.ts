import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
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

  constructor(private route:ActivatedRoute, 
              private indicadorService:IndicadorService, 
              private router:Router) { }

public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
public idDepto = Number(this.route.snapshot.paramMap.get('idDepto'));
public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
public idActividad = Number(this.route.snapshot.paramMap.get('idActividad'));

public actividad_seleccionada:number=this.idActividad;
public ActividadListS : Array<Actividad> = []

ngOnInit(): void {
  this.initData();
}

async initData(){
  this.ActividadListS = await firstValueFrom(this.indicadorService.getActividades(this.idPoa));
  console.log("00000000"+ this.ActividadListS)
}

  selectActividad(){
    this.router.navigate(['/gestion_poa/actividad/tab/',this.actividad_seleccionada,this.idPoa,this.idDepto,this.idInsti]);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
}
