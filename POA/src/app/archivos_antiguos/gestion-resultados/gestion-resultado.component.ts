import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ResultadoService } from './resultado.service';
import { ResultadoModels } from './resultado.model'
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { DimensionModels } from '../gestion-dimension/dimension.model';

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
    id: 0,
    nombre: "",
    isDelete: false,
    createdAt: new Date(),
    updatedAt:  new Date(),
    idObjetivos: 1,
    idDimension: 1,
    idPei: 1,
    objetivo: {
        id: 0,
        nombre: "",
        isDelete: false,
        createdAt: new Date(),
        updatedAt:  new Date(),
        idDimension: 1,
        idPei: 1,
        dimension: {
            id: 0,
            nombre: "",
            descripcion: "",
            isDelete: false,
            createdAt: new Date(),
            updatedAt:  new Date(),
            idPei: 1,
            pei: {
                id: 0,
                name: "",
                initialYear: new Date(),
                finalYear: new Date(),
                isDelete: false,
                isActive: false,
                createdAt: new Date(),
                updatedAt:  new Date(),
            }
        }
    }
}
}


//private resultado_example : ResultadoModels.Resultado | any = {};
rutaActual = "Resultado"; //Sirve para definir los iconos en el sidevar
public user = this.Storage.get_storage("user"); //Obtener el usuario logueado
public filter:string=""; //Para filtar la tabla
public _delete: any; // Define que elemento se eliminara
public data_update :ResultadoModels.Resultado | any = this.resultado_example; //Define los datos de un elemento a actualizar
data_create : ResultadoModels.Resultado | any = this.resultado_example;
public area_seleccionado:string="";
public dimension_seleccionado:string="";
public objetivo_seleccionado:string="";
public pei_seleccionado:string="";

resultadoList1: any = [];
resultadoList: any = []; //Almacena los resultado y llena la tabla resultado
areaList: any = []; //Almacena las áreas para mostrarlas en los select


public page:number=0;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]
  
constructor(private Storage:Storage, private ResultadoService:ResultadoService, private router: Router) { }

  ngOnInit(): void {
    this.getResultado();
    this.getArea();
    this.initData();
  } 

  async initData(){
    // obtiene todas las dimensiones
    const resultados = await firstValueFrom(this.ResultadoService.getResultado())
    this.resultadoList1 = resultados;
    console.log(this.resultadoList1);
    console.log('entra');
    // sirve para definir un maximo de paginas en paginacion de tablas
    this.maxPages = ((this.resultadoList.length / this.step ) === 0 ) ? Math.floor(this.resultadoList.length / this.step) : (Math.floor(this.resultadoList.length / this.step) + 2)// cantidad de paginas para los botones
    // sirve para generar los botones en paginacion
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages + 1) ;

    console.log(this.enumPages)
  }

//Método que obtiene los resultados mediante el servico creado
async getResultado(){
  this.ResultadoService.getResultado().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getResultado().subscribe((data:any) =>this.resultadoList = data.allResultado);
}

//Método que obtiene las áreas mediante el servico creado
async getArea(){
  this.ResultadoService.getArea().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getArea().subscribe((data:any) =>this.areaList = data);
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
    Swal.fire({
      icon: 'success',
      title: '¡Eliminado con éxito!',
      showConfirmButton: false,
      timer: 2500
    })
    setTimeout(function() {
      window.location.reload();
    },1500);
  }

//Método para crear un nuevo resultado
async crear_Resultado(nombre:string,idArea:string){
  await this.ResultadoService.crearResultado(nombre,parseInt(idArea)).subscribe((res:any)=>{
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
   try{
   this.ResultadoService.updateResultado(nombre,id,parseInt(idArea)).subscribe((res:any)=>{
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

