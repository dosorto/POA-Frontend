import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
//import { ResultadoService } from 'src/app/archivos_antiguos/gestion-resultados/resultado.service'; 
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Resultado } from '../../../interfaces-pei/resultado.model';
import { Area } from '../../../interfaces-pei/area.model'


import { ResultadosService } from '../../../services-pei/resultados.service';



@Component({
  selector: 'app-update-resultado-component',
  templateUrl: './update-resultado-component.component.html',
  styleUrls: ['./update-resultado-component.component.css']
})
export class UpdateResultadoComponentComponent implements OnInit {


  constructor(private Storage:Storage, 
    private resultadosService:ResultadosService,
    private router:Router,
    private _route: ActivatedRoute) { }

public area:Area | any = {}
public idArea:number = Number(this._route.snapshot.paramMap.get('idArea'));
public id:number = Number(this._route.snapshot.paramMap.get('id'));
idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
idDimension:number = Number(this._route.snapshot.paramMap.get('idDimension'));
idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
public resultado: Resultado | any = {};
public nombre:string='';
public descripcion:string='';

ngOnInit(): void {
this.initData();
}

async initData(){
this.resultado = await this.resultadosService.getResultadoss(this.id).subscribe((response:any)=>{
this.resultado = response.resultado;
console.log(response);
}
);
console.log(this.resultado);

this.area = await this.resultadosService.getArea_Id(this.idArea).subscribe((response:any)=>{
  this.area = response.area;
})
}
toDetail(){
this.router.navigate(['/gestion_pei/resultados/detail/',this.id,this.idArea,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
}
Update():any{
let nombre = this.nombre;
let descripcion = this.descripcion
console.log(":"+nombre+":" + ":"+descripcion);
// validaciones
if((nombre === '')){nombre = this.resultado.nombre}
if((descripcion === '')){descripcion = this.resultado.descripcion}

console.log(":"+nombre+":" + ":"+descripcion);
try{
this.resultadosService.updateResultado(nombre,descripcion,this.id,this.idArea).subscribe((res:any)=>{

Swal.fire({
icon: 'success',
title: '??Actualizado con ??xito!',
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
this.toDetail();

} catch(error){
console.log(error);
}
setTimeout(function() {
window.location.reload();
},1500);


}

}
