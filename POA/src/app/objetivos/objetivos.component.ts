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
  //   area: {
  //     id: 1,
  //     nombre: '',
  //     isDelete: false,
  //     createdAt: new Date(),
  //     updatedAt:  new Date(),
  //     idObjetivos: 1,
  //     idDimension: 1,
  //     idPei: 1
  // },
  Dimension: {
    id: 0,
    nombre: '',
    descripcion: '',
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idPei: 1
  },
  // objetivo: {
  //     id: 0,
  //     nombre: '',
  //     isDelete: false,
  //     createdAt: new Date(),
  //     updatedAt:  new Date(),
  //     idDimension: 1,
  //     idPei: 1
  // },
  
  Pei: {
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
  _delete:any;
 public data_update: objetivomodel.objetivo=this.objetivo_example;
  objetivosList: any = [];
  dimensionList: any = [];
  
  // dimensionList: any = [];
  // rutaActual = "pei";

  objetivoss: Array<objetivomodel.objetivo> = [];
  peis: Array<peiModel.Pei> = [];
  dimensiones:Array<DimensionModels.dimension>=[];
  

    public objetivo:FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    idDimension: new FormControl('',[Validators.required]),
    idPei: new FormControl('',[Validators.required])
  })
  
  async initData() {
    let peis = await firstValueFrom(this.objetivosService.getPEI())
    this.peis = peis;
  }

  async initData_Dimension(){

    this.objetivosService.getdimensiones().subscribe((data:any) =>console.log(data));
  this.objetivosService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
  }

  async initData_Objetivo(){
    let objetivos = await firstValueFrom(this.objetivosService.getObjetivos())
    this.objetivoss = objetivos;
  }
    //id=String;
  //dataSource = this.userList;  // MatPaginator Output
    /*@ViewChild(MatPaginator) paginator!: MatPaginator; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/


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

    // mostrarPei() {
    //   this.objetivosService.getPei().subscribe((response:any) => 
    //   this.peisList = response.pei);
      
    //   }
  // mostrarDimension() {
  //   this.objetivosService.getdimension().subscribe((response1:any) => 
  //   this.dimensionList = response1.all_dimension);
  //   this.objetivosService.getdimension().subscribe((response:any) => console.log(response));    
  //   console.log(this.dimensionList)  
  // }
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
  // eliminarObjetivo(id: any) {
  //   this.objetivosService.eliminarObjetivo(id).subscribe((response:any) => {
  //     this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
  //     this.mostrarObjetivo();
  //   }, error => {
  //     console.log(error);
  //   })
  // }
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

//   agregarObjetivo(){
//     const OBJETIVO: Objetivo = {
//       nombre: this.objetivosForm.get('nombre')?.value,
//       idDimension: this.objetivosForm.get('idDimension')?.value,
//       idPei: this.objetivosForm.get('idPei')?.value,
//     }
//     console.log(OBJETIVO);
// this.objetivosService.insertarObjetivo(OBJETIVO).subscribe(data =>{
//   console.log('Agregado');
// }, error =>
//   console.log(error));
//   this.objetivosForm.reset();


//   }
set_update(_objetivos: objetivomodel.objetivo){
  this.data_update = _objetivos
  console.log(this.data_update)
};

// update(nombre:string,idDimension:string, idPei:string){
//    const id = this.data_update.id; // ahi se aloja el id
//    // validaciones
//   if((nombre === '')){nombre = this.data_update.nombre}
//   if((idDimension === '')){idDimension= this.data_update.idDimension.toString()}
//   if((idPei === '')){idPei= this.data_update.idPei.toString()}
//    try{
//    this.objetivosService.updateObjetivo(nombre,parseInt(idDimension),id,parseInt(idPei)).subscribe((res:any)=>{
      
//     Swal.fire({
//       icon: 'success',
//       title: '¡Actualizado con éxito!',
//       showConfirmButton: false,
//       timer: 2500
//     })
//    },(error:any)=>{
//     Swal.fire({
//       icon: 'error',
//       title: 'Ha ocurrido un error',
//       showConfirmButton: false,
//       timer: 2500
//     })
//    });
     
//  } catch(error){
//    console.log(error);
//  }
// }
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
    Swal.fire({
     icon: 'success',
     title: '¡Actualizado con éxito!',
     showConfirmButton: false,
     timer: 2500
   })
 
  },(error:any)=>{
    console.log(error);
    Swal.fire({
     icon: 'error',
     title: 'Ha ocurrido un error',
     showConfirmButton: false,
     timer: 2500
    })
  });
  
 } catch(error){
   console.log(error);
 }
 setTimeout(function() {
  window.location.reload();
},1500);
}
}
