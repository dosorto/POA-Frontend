import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from '../../../interfaces-pei/area.model';
import { ResultadosService } from '../../../services-pei/resultados.service';
@Component({
  selector: 'app-all-resultado-component',
  templateUrl: './all-resultado-component.component.html',
  styleUrls: ['./all-resultado-component.component.css']
})
export class AllResultadoComponentComponent implements OnInit {

  constructor( private resultadoService:ResultadosService, private router: Router, private toastr: ToastrService,private route: ActivatedRoute) { }
  id = Number(this.route.snapshot.paramMap.get('id'));
  public idArea = Number(this.route.snapshot.paramMap.get('idArea'));
  idObjetivo:number = Number(this.route.snapshot.paramMap.get('idObjetivo'));
  idDimension:number = Number(this.route.snapshot.paramMap.get('idDimension'));
  idPei:number = Number(this.route.snapshot.paramMap.get('idPei'));
  idInsti:number = Number(this.route.snapshot.paramMap.get('idInsti'));
  //public areaList : Array<Area> = [];
  ngOnInit(): void {
    const idArea = Number(this.route.snapshot.paramMap.get('idArea'));
    this.mostrar_resultados_idArea(idArea)
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
  this.resultadoService.getResultado2().subscribe((data:any) =>console.log(data));
  this.resultadoService.getResultado2().subscribe((data:any) =>this.resultadoList = data);
}
  
  async initData_Area(){

    this.resultadoService.getAreas().subscribe((data:any) =>console.log(data));
    this.resultadoService.getAreas().subscribe((data:any) =>this.areaList = data);
  }  

  //por id
  mostrar_resultados_idArea(id: any) {
    this.resultadoService.mostrar_Allresultado_idArea(id).subscribe((response:any) => 
    this.resultadoList = response);
      
  }

  toDetail(id:number){
    this.router.navigate(['/gestion_pei/resultados/detail/',id.toString(),this.idArea,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
  }

  toCreate(){
    this.router.navigate(['/gestion_pei/resultados/create/',this.idArea.toString(),this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
  }
  toArea(){
    this.router.navigate(['gestion_pei/areas/detail/1/1']);
  }
  selectArea(){
    this.router.navigate(['/gestion_pei/resultados/list/',this.area_seleccionado,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
    console.log(this.area_seleccionado,this.idObjetivo,this.idDimension,this.idPei,this.idInsti);
    setTimeout(function () {
     window.location.reload();
    }, 10)
  }

}
