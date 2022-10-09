import { peiModel } from "../modules/pei/pei.model";
import { Component, OnInit } from '@angular/core';
import { ObjetivosService } from './objetivos.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { objetivomodel } from './objetivos.model';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { DimensionModels } from "../modules/gestion-dimension/dimension.model";
//import { FilterPipePipe } from './filter-pipe.pipe';
@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {

   private objetivo_example :objetivomodel.objetivo={
      id: 0,
      nombre: '',
      isDelete: false,
      createdAt: new Date(),
      updatedAt:  new Date(),
      idDimension: 1,
      idPei: 1,
  
  dimension: {
    id: 0,
    nombre: '',
    descripcion: '',
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idPei: 1
  },
  
  
  pei: {
      id: 0,
      name: '',
      initialYear: new Date(),
      finalYear:   new Date(),
      isDelete: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt:  new Date(),
  }
  
  }
   
   
  
  public dimension_seleccionado:string="";
  public pei_seleccionado:string="";
  public filter:string=""; //Para filtar la tabla
  _delete:any;
 public data_update: objetivomodel.objetivo=this.objetivo_example;
  objetivosList: any = [];
  dimensionList: any = [];
  peisList:any=[];
  

  objetivoss: Array<objetivomodel.objetivo> = [];
  peis: Array<peiModel.Pei> = [];
  dimensiones:Array<DimensionModels.dimension>=[];
  

    public objetivo:FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    idDimension: new FormControl('',[Validators.required]),
    idPei: new FormControl('',[Validators.required])
  })
  
  async initData() {
    this.objetivosService.getPEI().subscribe((data:any) =>console.log(data));
    this.objetivosService.getPEI().subscribe((data:any) =>this.peisList = data);
  }

  async initData_Dimension(){

    this.objetivosService.getdimensiones().subscribe((data:any) =>console.log(data));
  this.objetivosService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
  }

  async initData_Objetivo(){
    let objetivos = await firstValueFrom(this.objetivosService.getObjetivos())
    this.objetivoss = objetivos;
  }
  


  constructor( private objetivosService:ObjetivosService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.objetivoss);
    console.log('El componente se ha inicializado');
    this.initData();
    //this.objetivosService.getObjetivos().subscribe((response:any) => this.objetivosList = response.allObjetivo);
    this.mostrarObjetivo();
    //this.mostrarDimension();
    // this.mostrarPei();
    this.initData_Dimension();
    this.initData_Objetivo();
   
  }

  mostrarObjetivo() {
    this.objetivosService.getObjetivos().subscribe((response:any) => 
    this.objetivosList = response.allObjetivo);
    
    }


    set_id_delete(id:Number){
      this._delete = id;
      console.log(this._delete)
    }
    async delete() {
      
      await this.objetivosService.eliminarObjetivo(this._delete)
      Swal.fire({
        title: 'Eliminado con exito',
        showConfirmButton: false,
        color:'white',
        background:'#F5B7B1',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        
      })
      setTimeout(function() {
        window.location.reload();
      },3000);
      
        
      window.location.reload();
      
    }
  
// Función para obtener los datos del formulario y almacenarlos.
  postObjetivo(form:objetivomodel.objetivo):any {
    this.objetivosService.postObjetivo(form).subscribe(data=>{
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: '¡Objetivo Registrado!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    }, (error:any)=>{
      })
  }




set_update(_objetivos: objetivomodel.objetivo){
  this.data_update = _objetivos
  console.log(this.data_update)
};


update(nombre:string, idDimension:string, idPei:string){
  const id = this.data_update.id; // ahi se aloja el id
  // validaciones
 if((nombre === '')){nombre = this.data_update.nombre}
//  if((idArea === '')){idArea= this.data_update.idArea.toString()}
 if((idDimension === '')){idDimension = this.data_update.idDimension.toString()}
//  if((idObjetivos === '')){idObjetivos = this.data_update.idObjetivos.toString()}
 if((idPei === '')){idPei = this.data_update.idPei.toString()}
  try{
  this.objetivosService.updateObjetivo(nombre,id,parseInt(idDimension),parseInt(idPei)).subscribe((res:any)=>{
    console.log(res);
     
  },(error:any)=>{
    
  });
  
 } catch(error){
   console.log(error);
 }
 Swal.fire({
  icon: 'success',
  title: '¡Actualizado con éxito!',
  showConfirmButton: false,
  timer: 2500
})

 setTimeout(function() {
   window.location.reload();
    },1500);
}
}
