import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObjetivosService } from '../../../services-pei/objetivos.service';


@Component({
  selector: 'app-all-objetivo-component',
  templateUrl: './all-objetivo-component.component.html',
  styleUrls: ['./all-objetivo-component.component.css']
})
export class AllObjetivoComponentComponent implements OnInit {

  constructor( private objetivosService:ObjetivosService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mostrarObjetivo(),
    this.initData_Dimension();
    console.log(this.mostrarObjetivo);
    this.objetivosService.getObjetivos().subscribe((response:any) =>console.log(response))
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
  dimension_seleccionado:string="";
  /*
  metodos para mostrar
  */
  mostrarObjetivo() {
    this.objetivosService.getObjetivos().subscribe((response:any) => 
    this.objetivosList = response);
    }
    async initData_Dimension(){

      this.objetivosService.getdimensiones().subscribe((data:any) =>console.log(data));
    this.objetivosService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
    }  

    //por id
    mostrar_objetivos_idDimension(id: any) {
      this.objetivosService.mostrar_objetivos_id(id).subscribe((response:any) => 
      this.objetivosList = response);
        
    }

    
  
}
