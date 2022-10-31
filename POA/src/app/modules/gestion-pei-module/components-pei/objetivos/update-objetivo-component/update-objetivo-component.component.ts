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
  objetivo: Objetivo | undefined;

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
    console.log(id)
    if (id) {
      this.getObjetivoss(id);  
    }
    console.log(this.objetivo?.id)
  }

  getObjetivoss(id: number): void {
    this.ObjetivoService.getObjetivo(id).subscribe({
      next: objetivo => {this.objetivo = objetivo},
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
  


  set_update(_objetivos: Objetivo){
    this.data_update = _objetivos
    console.log(this.data_update)
  };
  
  
  update(nombre:string,descripcion:string){
    const id = this.data_update.id; // ahi se aloja el id
    // validaciones
   if((nombre === '')){nombre = this.data_update.nombre}
   if((descripcion === '')){descripcion = this.data_update.descripcion}
   //  if((idArea === '')){idArea= this.data_update.idArea.toString()}
  //  if((idDimension === '')){idDimension = this.data_update.idDimension.toString()}
  //  if((idObjetivos === '')){idObjetivos = this.data_update.idObjetivos.toString()}
  //  if((idPei === '')){idPei = this.data_update.idPei.toString()}
    try{
    this.ObjetivoService.updateObjetivo(nombre,id,descripcion).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      
    },(error:any)=>{
      
    });
    
   } catch(error){
     console.log(error);
     console.log(error);
      Swal.fire({
       icon: 'error',
       title: 'Ha ocurrido un error',
       showConfirmButton: false,
       timer: 2500
      }) 
   }
   
  //  setTimeout(function() {
  //    window.location.reload();
  //     },1500);
  }
  }
  




