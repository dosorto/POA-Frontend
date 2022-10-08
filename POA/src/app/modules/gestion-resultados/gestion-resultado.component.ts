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

rutaActual = "Resultado";
public resultados:Array<ResultadoModels.Resultado>=[];
public lista_area:Array<ResultadoModels.area>=[];
public lista_dimension:Array<ResultadoModels.Dimension>=[];
public lista_objetivo:Array<ResultadoModels.objetivos>=[];
public lista_pei:Array<ResultadoModels.Pei>=[];
public user = this.Storage.get_storage("user");
public filter:string=""; // para filtar la tabla
public _delete: any;
public data_update :ResultadoModels.Resultado = this.resultado_example;
public area_seleccionado:string="";
public dimension_seleccionado:string="";
public objetivo_seleccionado:string="";
public pei_seleccionado:string="";
//public data_update:Array<string>=[]; 
resultadoList: any = [];
dimensionList: any = [];
areaList: any = [];
peiList: any = [];
objetivoList: any = [];

public page:number=0;
public step:number=5;
public maxPages:number=1;
public enumPages:number[]=[]
  
constructor(private Storage:Storage, private ResultadoService:ResultadoService, private router: Router) { }
 


  ngOnInit(): void {
    //this.initData();
    this.getResultado();
    this.getDimension();
    this.getArea();
    this.getObjetivo();
    this.getPei();
  }
 
  async initData(){
    /*const resultados = await firstValueFrom(this.ResultadoService.getResultado());
    this.resultados = resultados;
    this.maxPages = Math.round(this.resultados.length / this.step ) // cantidad de paginas para los botones
    if((this.resultados.length % this.step ) !== 0 ){this.maxPages++}; // si sobran pocos elementos agrega otra pagina
    this.enumPages =  Array(this.maxPages).fill(null).map((x,i)=>i).slice(1,this.maxPages);
    const area = await firstValueFrom(this.ResultadoService.getAreaList())
    this.lista_area = area;
    const dimensiones = await firstValueFrom(this.ResultadoService.getDimensionList())
    this.lista_dimension = dimensiones;
    const objetivos = await firstValueFrom(this.ResultadoService.getObjetivoList())
    this.lista_objetivo = objetivos;
    const peis = await firstValueFrom(this.ResultadoService.getPeiList())
    this.lista_pei = peis;
  */
}

async getResultado(){
  this.ResultadoService.getResultado().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getResultado().subscribe((data:any) =>this.resultadoList = data.allResultado);
}

async getDimension(){
  this.ResultadoService.getDimension().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getDimension().subscribe((data:any) =>this.dimensionList = data);
}

async getArea(){
  this.ResultadoService.getArea().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getArea().subscribe((data:any) =>this.areaList = data);
}

async getObjetivo(){
  this.ResultadoService.getObjetivo().subscribe((data:any) =>console.log(data));
  this.ResultadoService.getObjetivo().subscribe((data:any) =>this.objetivoList = data.allObjetivo);
}

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

  set_id_delete(id:Number){
    this._delete = id;
    console.log(this._delete)
  }
  async delete() {
    await this.ResultadoService.eliminarObjetivo(this._delete);
    setTimeout(function() {
      window.location.reload();
    },100);
  }
  

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


set_update(_resultado:ResultadoModels.Resultado){
  this.data_update = _resultado
};
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

