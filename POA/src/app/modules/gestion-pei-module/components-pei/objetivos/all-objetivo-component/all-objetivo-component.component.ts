import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { ObjetivosService } from '../../../services-pei/objetivos.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { PeiService } from '../../../services-pei/pei.service';
import { DimensionService } from '../../../services-pei/dimension.service';


@Component({
  selector: 'app-all-objetivo-component',
  templateUrl: './all-objetivo-component.component.html',
  styleUrls: ['./all-objetivo-component.component.css']
})
export class AllObjetivoComponentComponent implements OnInit {
  errorMessage = '';
  objetivos: Objetivo | undefined;
  //objetivo: Objetivo | undefined;
  public idPei = Number(this._route.snapshot.paramMap.get('idPei'));
  public idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));
  public pei : Pei | any = {};
  public dimension : Dimension | any = {};
  public insti : Institucion |any = {};

  constructor( private _route: ActivatedRoute,
               private objetivosService:ObjetivosService,
               private peiServices : PeiService,
               private dimensionService : DimensionService,
               private router: Router,
               private toastr: ToastrService) { }
  idfun(){
    return this.id
  }
  idDimensiones = ''
  public idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
  id = Number(this._route.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    
    this.peiServices.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion;
    })
    this.dimension = this.dimensionService.getDimension(this.idDimension).subscribe((response:any)=>{
      this.dimension = response;
    })
    this.pei =  this.peiServices.getPEI_Id(this.idPei).subscribe((response:any)=>{
      this.pei = response.pei;
    })
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
      this.router.navigate(['/gestion_pei/objetivos/detail/',id.toString(),this.idDimension,this.idPei,this.idInsti]);
    }
    toDimensionList(){
      this.router.navigate(['/gestion_pei/dimension/detail/',this.idDimension,this.idPei,this.idInsti]);
    }
    toPeiList(){
      this.router.navigate(['/gestion_pei/pei/detail/',this.idPei,this.idInsti]);
    }
    toInstitucionList(){
      this.router.navigate(['/gestion_pei/pei/list/',this.idInsti]);
    }

    selectDimension(){
      this.router.navigate(['/gestion_pei/objetivos/list/',this.dimension_seleccionado,this.idPei,this.idInsti]);
      setTimeout(function () {
        window.location.reload();
      }, 10)
    }


    toCreate(){
      this._route.paramMap.subscribe((params: ParamMap) => {
        const idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
        const idPei = Number(this._route.snapshot.paramMap.get('idPei'));
        const idInsti = Number(this._route.snapshot.paramMap.get('idInsti'));
        //this.getObjetivoss(idDimension);
        this.router.navigate(['/gestion_pei/objetivos/create/',idDimension,idPei,idInsti]);

        
      })
      
    }
    
  
}
