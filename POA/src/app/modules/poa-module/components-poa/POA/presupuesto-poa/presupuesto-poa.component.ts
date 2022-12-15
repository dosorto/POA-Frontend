import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Storage } from '../../../../../_core/global-services/local_storage.service';
import { UnidadEjecutora } from '../../../interfaces-poa/unidad_ejecutora.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';
import { UePresupuestoModel } from '../../../interfaces-poa/ue_presupuesto.model';


@Component({
  selector: 'app-presupuesto-poa',
  templateUrl: './presupuesto-poa.component.html',
  styleUrls: ['./presupuesto-poa.component.css']
})
export class PresupuestoPoaComponent implements OnInit {

  constructor(private Storage:Storage,
              private _route:ActivatedRoute,
              private service:UePresupuesto,
              private router:Router) { }
  public presupuesto_unidadesEjecutorasFromDb:Array<UePresupuestoModel> = [];
  public user:any={}; // usuario logueado (no es tipo user, es un json)
  public idUESelect: number = Number(this.Storage.get_storage('idUe'));
  public UAListFromDb:Array<UnidadEjecutora> = [];
  public UnidadEjecutoraSeleccionada: number = 1;
  public filter:string='';

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = []



  ngOnInit(): void {
    this.user = this.Storage.get_storage('user');
    this.idUESelect = Number(this.Storage.get_storage('idUe'));
    this.cargarUePresupuestosFromDb()
  }
  

  async cargarUePresupuestosFromDb(){
    this.presupuesto_unidadesEjecutorasFromDb = await this.service.getAllUePresupuestos(this.user.empleado.ejecutora.id).subscribe(
      (response:any)=>{
        this.presupuesto_unidadesEjecutorasFromDb = response;
      }
    ); 
  }
  selectUA(){

  }
  toCreate(){
    this.router.navigate(['gestion_poa/ue_presupuesto/crear']);
  }
  toHome(){

  }
  toDetail(id:number){
    this.router.navigate(['gestion_poa/poas/crear_poa_deptos',id.toString()])
  }
  nextPage(){
    this.page = this.page + this.step;
    this.actualpage++;
  }
  previousPage(){
    this.page = this.page - this.step;
    this.actualpage--;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }
}
