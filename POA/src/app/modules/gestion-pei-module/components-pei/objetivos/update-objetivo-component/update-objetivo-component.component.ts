import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { ObjetivosService } from '../../../services-pei/objetivos.service';


@Component({
  selector: 'app-update-objetivo-component',
  templateUrl: './update-objetivo-component.component.html',
  styleUrls: ['./update-objetivo-component.component.css']
})
export class UpdateObjetivoComponentComponent implements OnInit {
  errorMessage = '';
  // public objetivo: Objetivo | any = {}

  public idDimension = Number(this._route.snapshot.paramMap.get('idDimension'));
  
  //id:Number = Number(this._route.snapshot.paramMap.get('id'));
   id=Number(this._route.snapshot.paramMap.get('id'));
   public objetivoss:Objetivo | any = {};
  public nombre:string='';
  public descripcion:string='';
  //public id:number = Number(this._route.snapshot.paramMap.get('id'));
  

  private objetivo_example :Objetivo={
    id: 0,
    nombre: '',
    descripcion:'',
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idDimension: 1,
    idPei: 1,
pei: {
    id: 0,
    name: '',
    initialYear: new Date(),
    finalYear:   new Date(),
    isDelete: false,
    isActive: true,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idInstitucion: 1
},
dimension: {
  id: 0,
  nombre: '',
  descripcion: '',
  isDelete: false,
  createdAt: new Date(),
  updatedAt:  new Date(),
  idPei: 1
}


}

public data_update: Objetivo=this.objetivo_example;

constructor( private _route: ActivatedRoute, private _router: Router, private ObjetivoService:ObjetivosService) { }

  
  ngOnInit(): void {
    
    console.log(this.data_update.dimension)
    const id = Number(this._route.snapshot.paramMap.get('id'));
    console.log("aqui ")
    console.log("aqui esta el id de dimension",this.idDimension)
    console.log(id)
    if (id) {
      this.getObjetivoss(id);  
    }
    console.log(this.objetivoss?.id)
  }

  getObjetivoss(id: number): void {
    this.ObjetivoService.getObjetivo(id).subscribe({
      next: objetivo => {this.objetivoss = objetivo},
      error: err => this.errorMessage = err
    });
  }
  onBack(): void {
    this._router.navigate(['/gestion_pei/objetivos/list']);
  }


  public dimension_seleccionado:string="";
  public pei_seleccionado:string="";
  dimensionList: any = [];
  peisList:any=[];

  async initData() {
    this.ObjetivoService.getPEI().subscribe((data:any) =>console.log(data));
    this.ObjetivoService.getPEI().subscribe((data:any) =>this.peisList = data);
    // console.log(this.update(""))
  }

  async initData_Dimension(){
    
    this.ObjetivoService.getdimensiones().subscribe((data:any) =>console.log(data));
  this.ObjetivoService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
  }

  // public objetivo:FormGroup = new FormGroup({
  //   nombre: new FormControl('',[Validators.required]),
  //   descripcion: new FormControl('',[Validators.required]),
  //   idDimension: new FormControl('',[Validators.required]),
  //   idPei: new FormControl('',[Validators.required])
  // })
  


  toDetail(){
    this._router.navigate(['/gestion_pei/objetivos/detail/',this.id,this.idDimension]);
  }
  
  Update():any{
    let nombre = this.nombre;
    let descripcion = this.descripcion;
    console.log(":"+nombre+":" + ":"+descripcion);
     // validaciones
    if((nombre === '')){nombre = this.objetivoss.nombre}
    if((descripcion === '')){descripcion = this.objetivoss.descripcion}
 
    console.log(":"+nombre+":" + ":"+descripcion);
     try{
      this.ObjetivoService.updateResultado(nombre,descripcion,this.id,this.idDimension).subscribe((res:any)=>{
      
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
     },(error:any)=>{
      
     });
    this.toDetail();
     
   } catch(error){
     console.log(error);
     Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      showConfirmButton: false,
      timer: 2500
    })
   }
   
  setTimeout(function() {
      window.location.reload();
       },100);
  }
  }
  




