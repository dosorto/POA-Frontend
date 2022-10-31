import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResultadosService } from '../../../services-pei/resultados.service';
@Component({
  selector: 'app-all-resultado-component',
  templateUrl: './all-resultado-component.component.html',
  styleUrls: ['./all-resultado-component.component.css']
})
export class AllResultadoComponentComponent implements OnInit {

  constructor( private resultadoService:ResultadosService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mostrarResultado(),
    this.initData_Area();
    console.log(this.mostrarResultado);
    this.resultadoService.getResultados().subscribe((response:any) =>console.log(response))
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
area_seleccionado:string="";
/*
metodos para mostrar
*/
async mostrarResultado(){
  this.resultadoService.getResultados().subscribe((data:any) =>console.log(data));
  this.resultadoService.getResultados().subscribe((data:any) =>this.resultadoList = data.allResultado);
}
  
  async initData_Area(){

    this.resultadoService.getAreas().subscribe((data:any) =>console.log(data));
    this.resultadoService.getAreas().subscribe((data:any) =>this.areaList = data);
  }  

  //por id
  mostrar_resultados_idArea(id: any) {
    this.resultadoService.mostrar_resultados_id(id).subscribe((response:any) => 
    this.resultadoList = response);
      
  }

}
