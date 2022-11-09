import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { ObjetivosService } from '../../../services-pei/objetivos.service';


@Component({
  selector: 'app-all-objetivo-component',
  templateUrl: './all-objetivo-component.component.html',
  styleUrls: ['./all-objetivo-component.component.css']
})
export class AllObjetivoComponentComponent implements OnInit {
  errorMessage = '';
  objetivos: Objetivo | undefined;
  //objetivo: Objetivo | undefined;
 

  constructor( private _route: ActivatedRoute,private objetivosService:ObjetivosService,private router: Router,private toastr: ToastrService) { }
  idfun(){
    return this.id
  }
  idDimensiones = ''
  public idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
  id = Number(this._route.snapshot.paramMap.get('id'));
  ngOnInit(): void {

    this._route.paramMap.subscribe((params: ParamMap) => {
      const idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
      this.getObjetivoss(idDimension);
      this.mostrarObjetivo(idDimension)
      
    })

  
    // const idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
    // console.log("aqui ")
    // console.log(id)
    // if (id) {
      // this.getObjetivoss(id);  
    // }
    // console.log(this.dimensiones?.nombre)
    // console.log(this.objetivos?.id)
    //this.mostrarObjetivo(idDimension),
    this.initData_Dimension();
    console.log(this.mostrarObjetivo);
    this.objetivosService.getObjetivos().subscribe((response:any) =>console.log(response))

    
    // console.log("aqui ")
    // console.log(idDimension)
    // if (idDimension) {
    //   this.getObjetivoss(idDimension);  
    // }
    
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
  Listdimension: any=[];
  /// esta es la que ocupo
  dimension_seleccionado:number=this.idDimension;
  /*
  metodos para mostrar
  */
  mostrarObjetivo(id:number) {
    this.objetivosService.mostrar_objetivo_id(id).subscribe((response:any) => 
    this.objetivosList = response);
    }
  
  mostrarDimension(id:number){
    this.objetivosService.mostrar_objetivo_id(id).subscribe((response:any) => 
    this.Listdimension = response);
  }
    async initData_Dimension(){

      this.objetivosService.getdimensiones().subscribe((data:any) =>console.log(data));
    this.objetivosService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
    }  

    //por id
    mostrar_objetivos_idDimension(id: any):void {
      this.objetivosService.mostrar_objetivo_id(id).subscribe((response:any) => 
      this.objetivosList = response);
      //this.router.navigate(['/gestion_pei/objetivos/list/',id]);
    }

    getObjetivoss(id: number): void {
      this.objetivosService.getObjetivo(id).subscribe({
        next: objetivo => {this.objetivos = objetivo},
        error: err => this.errorMessage = err
      });
    }
    // onBack(): void {
    //   this._router.navigate(['/gestion_pei/objetivos/list']);
    // }

    toDetail(id:number){
      
      this.router.navigate(['/gestion_pei/objetivos/detail/',id.toString(),this.idDimension]);
    }
    toDimensionList(){
      this.router.navigate(['/gestion_pei/dimension/detail/1/1']);
    }

    toCreate(){
      this._route.paramMap.subscribe((params: ParamMap) => {
        const idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
        //this.getObjetivoss(idDimension);
        this.router.navigate(['/gestion_pei/objetivos/create/',idDimension]);
        
      })
      
    }
    
  
}
