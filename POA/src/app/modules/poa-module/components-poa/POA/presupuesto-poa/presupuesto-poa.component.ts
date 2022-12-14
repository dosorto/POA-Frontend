import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Storage } from '../../../../../_core/global-services/local_storage.service';
import { UnidadEjecutora } from '../../../interfaces-poa/unidad_ejecutora.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presupuesto-poa',
  templateUrl: './presupuesto-poa.component.html',
  styleUrls: ['./presupuesto-poa.component.css']
})
export class PresupuestoPoaComponent implements OnInit {

  constructor(private Storage:Storage,
              private _route:ActivatedRoute) { }
  public presupuesto_unidadesEjecutorasFromDb:any={};
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
  }
  ngOnDestroy():void{
  }

  selectUA(){

  }
  toCreate(){

  }
  toHome(){

  }
  toDetail(id:number){

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
