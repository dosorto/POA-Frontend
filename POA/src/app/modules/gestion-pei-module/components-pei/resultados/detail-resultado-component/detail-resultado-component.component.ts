import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import Swal from 'sweetalert2';
import { Area } from '../../../interfaces-pei/area.model';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { Pei } from '../../../interfaces-pei/pei.model';

import { Resultado } from '../../../interfaces-pei/resultado.model';
import { ResultadosService } from '../../../services-pei/resultados.service';
import { PeiService } from '../../../services-pei/pei.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { ObjetivosService } from '../../../../gestion-pei-module/services-pei/objetivos.service';
import { AreasService } from '../../../services-pei/areas.service';


@Component({
  selector: 'app-detail-resultado-component',
  templateUrl: './detail-resultado-component.component.html',
  styleUrls: ['./detail-resultado-component.component.css']
})
export class DetailResultadoComponentComponent implements OnInit {

  public id = Number(this.route.snapshot.paramMap.get('id'));
  public idObjetivo:number = Number(this.route.snapshot.paramMap.get('idObjetivo'));
  public idDimension:number = Number(this.route.snapshot.paramMap.get('idDimension'));
  public idPei:number = Number(this.route.snapshot.paramMap.get('idPei'));
  public idInsti:number = Number(this.route.snapshot.paramMap.get('idInsti'));
  public idArea = Number(this.route.snapshot.paramMap.get('idArea'));

  public resultado:Resultado | any ={};
  public area:Area | any = {}
  public objetivo: Objetivo | any = {};
  public dimension: Dimension | any = {};
  public pei: Pei | any = {}
  public insti: Institucion | any = {};

  pageTitle = 'Resultado Detail';
  errorMessage = '';
  //resultado: Resultado | undefined;
  _delete:any;
 
   constructor(private route: ActivatedRoute, 
              private resultadoService:ResultadosService, 
              private router: Router, 
              private PeiService: PeiService,
              private DimensionService:DimensionService,
              private ObjetivoService:ObjetivosService,
              private AreaService:AreasService) { }


ngOnInit(){
    this.initData();             
  const id = Number(this.route.snapshot.paramMap.get('id'));
  console.log("aqui ")
  // this.getResultado(id);
  // console.log(id)
  // if (id) {
  // this.getResultado(id);  
  // console.log(this.resultado?.id)
  // }
  // console.log(this.resultado?.id)

  }


  async initData(){

    this.resultado = await this.resultadoService.getResultado(this.id).subscribe((response:any)=>{
      this.resultado = response.resultado;
      console.log(response);
    })

    this.pei = await this.resultadoService.getPei_Id(this.idPei).subscribe((response:any)=>{
      this.pei = response.pei;
    })
    this.insti = await this.resultadoService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion;
    })
    this.dimension = await this.resultadoService.getDimensio_Id(this.idDimension).subscribe((response:any)=>{
      this.dimension = response.dimension;
    })
    this.objetivo = await this.resultadoService.getObjetivo_Id(this.idObjetivo).subscribe((response:any)=>{
      this.objetivo = response.objetivo;
    })

    this.area = await this.resultadoService.getArea_Id(this.idArea).subscribe((response:any)=>{
      this.area = response.area;
    })
  }
  // getResultado(id: number): void {
  // this.resultadosService.getResultado(id).subscribe({
  //   next: resultado => {this.resultado = resultado},
  //   error: err => this.errorMessage = err
  // });
  // }
  onBack(): void {
    this.router.navigate(['/gestion_pei/resultados/list/',this.resultado.idArea]);
  }
  onBackGestion(): void {
    this.router.navigate(['/gestion_pei/resultados/list/',this.resultado.idArea]);
  }
  set_id_delete(id:any){
    this._delete = id;
    console.log(this._delete)
  }
              
              
                  // metodos para eliminar
async delete() {
  
  await this.resultadoService.eliminarResultado(this._delete)
  Swal.fire({
    title: 'Eliminado con exito',
    showConfirmButton: false,
    color:'white',
    background:'#F5B7B1',
    timer: 300,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
    
  } )
 
  setTimeout(function() {
    window.location.reload();
  },100);
  this.toList();
    
  // window.location.reload();
  
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/resultados/update/',this.id,this.idArea,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]);
  }

  toList(){
    this.router.navigate(['/gestion_pei/resultados/list/',this.idArea,this.idObjetivo,this.idDimension,this.idPei,this.idInsti]); //revisar
  }

}