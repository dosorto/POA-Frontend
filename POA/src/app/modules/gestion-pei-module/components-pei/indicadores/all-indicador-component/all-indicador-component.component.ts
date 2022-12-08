import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IndicadoresService } from '../../../services-pei/indicadores.service'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-indicador-component',
  templateUrl: './all-indicador-component.component.html',
  styleUrls: ['./all-indicador-component.component.css']
})
export class AllIndicadorComponentComponent implements OnInit {

  constructor(private indicadoresService:IndicadoresService, 
              private router: Router, 
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private _location: Location) { }

              id = Number(this.route.snapshot.paramMap.get('id'));
              idResultado = Number(this.route.snapshot.paramMap.get('idResultado'));
              idArea = Number(this.route.snapshot.paramMap.get('idArea'));

  ngOnInit(): void {
    const idResultado = Number(this.route.snapshot.paramMap.get('idResultado'));
    this.mostrar_indicadores_idResultado(idResultado)
    //this.mostrarIndicador(),
    this.initData_Resultado();
    console.log(this.mostrarIndicador);
    this.indicadoresService.getIndicadores().subscribe((response:any) =>console.log(response))
  }

//filtro
public filter:string="";

//paginacion
public page:number=0;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]

// metodos para paginacion
nextPage(){
  this.page = this.page + this.step;
}
previousPage(){
  this.page = this.page - this.step;
}
selectPage(numPage:number){
  this.page = numPage * this.step;
}

//variables de llamado
objetivosList: any = [];
dimensionList: any = [];
areaList: any = [];
resultadoList: any = [];
indicadoresList: any = [];
resultado_seleccionado:string="";

/*
metodos para mostrar
*/


async mostrarIndicador(){
  this.indicadoresService.getIndicador2().subscribe((data:any) =>console.log(data));
  this.indicadoresService.getIndicador2().subscribe((data:any) =>this.indicadoresList = data);
}
  
  async initData_Resultado(){

    this.indicadoresService.getResultados().subscribe((data:any) =>console.log(data));
    this.indicadoresService.getResultados().subscribe((data:any) =>this.resultadoList = data);
  }  

  //por id
  mostrar_indicadores_idResultado(id: any) {
    this.indicadoresService.mostrar_AllIndicadores_idResultado(id).subscribe((response:any) => console.log(response))
    this.indicadoresService.mostrar_AllIndicadores_idResultado(id).subscribe((data:any) => 
    this.indicadoresList = data);
      
  }


  toDetail(id:number){
    this.router.navigate(['/gestion_pei/indicadores/detail/',id.toString(),this.idResultado]);
  }

  toCreate(){
    this.router.navigate(['/gestion_pei/indicadores/create/',this.idResultado.toString()]);
  }

  // toAreas(){
  //   this.router.navigate(['/gestion_pei/areas/detail/',this.idObjetivo.toString()]);
  // }

  
}
