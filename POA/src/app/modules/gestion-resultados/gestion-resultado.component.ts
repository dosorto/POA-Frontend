import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ResultadoService } from './resultado.service';
import { ResultadoModels } from './resultado.model'
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DimensionModels } from '../gestion-dimension/dimension.model';

@Component({
  selector: 'app-gestion-resultado',
  templateUrl: './gestion-resultado.component.html',
  styleUrls: ['./gestion-resultado.component.css']
})
export class GestionResultadoComponent implements OnInit {

// Objeto tipo resultado para usarlo de base
private resultado_example:ResultadoModels.Resultado = {
  id:      0,
  nombre:   "",
  isDelete:  false,
  createdAt: new Date(),
  updatedAt:  new Date(),
  idArea: 1,
  idDimension:1,
  idObjetivos:1,
  idPei:1,
  area: {
    id: 1,
    nombre: '',
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idObjetivos: 1,
    idDimension: 1,
    idPei: 1
},
dimension: {
  id: 0,
  nombre: '',
  descripcion: '',
  isDelete: false,
  createdAt: new Date(),
  updatedAt:  new Date(),
  idPei: 1
},
objetivo: {
    id: 0,
    nombre: '',
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idDimension: 1,
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

rutaActual = "Resultado"; //Sirve para definir los iconos en el sidevar
public user = this.Storage.get_storage("user"); //Obtener el usuario logueado
public filter:string=""; //Para filtar la tabla
public _delete: any; // Define que elemento se eliminara
public data_update :ResultadoModels.Resultado = this.resultado_example; //Define los datos de un elemento a actualizar
public area_seleccionado:string="";
public dimension_seleccionado:string="";
public objetivo_seleccionado:string="";
public pei_seleccionado:string="";

resultadoList: any = []; //Almacena los resultado y llena la tabla resultado
dimensionList: any = []; //Almacena las dimesiones para mostrarlas en los select
areaList: any = []; //Almacena las áreas para mostrarlas en los select
peiList: any = []; //Almacena los pei para mostrarlos en los select
objetivoList: any = []; //Almacena los objetivos para mostrarlos en los select

public page:number=0;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]
  
constructor(private Storage:Storage, private ResultadoService:ResultadoService, private router: Router) { }
 


  ngOnInit(): void {
    this.getResultado();
    this.getDimension();
    this.getArea();
    this.getObjetivo();
    this.getPei();
  }

//Método que obtiene los resultados mediante el servico creado
async getResultado(){
  this.ResultadoService.getResultado().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getResultado().subscribe((data:any) =>this.resultadoList = data.allResultado);
}
//Método que obtiene las dimensiones mediante el servico creado
async getDimension(){
  this.ResultadoService.getDimension().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getDimension().subscribe((data:any) =>this.dimensionList = data);
}
//Método que obtiene las áreas mediante el servico creado
async getArea(){
  this.ResultadoService.getArea().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getArea().subscribe((data:any) =>this.areaList = data);
}
//Método que obtiene los objetivos mediante el servico creado
async getObjetivo(){
  this.ResultadoService.getObjetivo().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getObjetivo().subscribe((data:any) =>this.objetivoList = data.allObjetivo);
}
//Método que obtiene los pei mediante el servico creado
async getPei(){
  this.ResultadoService.getPei().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getPei().subscribe((data:any) =>this.peiList = data);
}

  nextPage(){
    this.page = this.page + this.step;
  }
  previousPage(){
    this.page = this.page - this.step;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }
//Establece el id del registro a eliminar
  set_id_delete(id:Number){
    this._delete = id;
    console.log(this._delete)
  }

//Método para eliminar un resultado
  async delete() {
    await this.ResultadoService.eliminarObjetivo(this._delete);
    setTimeout(function() {
      window.location.reload();
    },100);
  }
  
//Método para crear un nuevo resultado
async crear_Resultado(nombre:string,idArea:string, idDimension:string, idObjetivos:string, idPei:string){
  await this.ResultadoService.crearResultado(nombre,parseInt(idArea),parseInt(idDimension),parseInt(idObjetivos),parseInt(idPei)).subscribe((res:any)=>{
    Swal.fire({
      icon: 'success',
      title: '¡Creado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })
  },(error:any)=>{
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      showConfirmButton: false,
      timer: 2500
    })
  });
  setTimeout(function() {
    window.location.reload();
  },1500);
}

//Establece el resultado a editar
set_update(_resultado:ResultadoModels.Resultado){
  this.data_update = _resultado
};

//Método para actualizar un resultado
update(nombre:string, idArea:string, idDimension:string, idObjetivos:string, idPei:string){
   const id = this.data_update.id; // ahi se aloja el id
// validaciones
  if((nombre === '')){nombre = this.data_update.nombre}
  if((idArea === '')){idArea= this.data_update.idArea.toString()}
  if((idDimension === '')){idDimension = this.data_update.idDimension.toString()}
  if((idObjetivos === '')){idObjetivos = this.data_update.idObjetivos.toString()}
  if((idPei === '')){idPei = this.data_update.idPei.toString()}
   try{
   this.ResultadoService.updateResultado(nombre,id,parseInt(idArea),parseInt(idDimension),parseInt(idObjetivos),parseInt(idPei)).subscribe((res:any)=>{
     console.log(res);
  
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

