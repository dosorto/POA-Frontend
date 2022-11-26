import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Resultado } from '../../../interfaces-pei/resultado.model';
import { ResultadosService } from '../../../services-pei/resultados.service'; 

@Component({
  selector: 'app-create-resultado-component',
  templateUrl: './create-resultado-component.component.html',
  styleUrls: ['./create-resultado-component.component.css']
})
export class CreateResultadoComponentComponent implements OnInit {

  errorMessage = '';
  resultados: Resultado | undefined;
  
  constructor(private resultadosService:ResultadosService, private router: Router, private route: ActivatedRoute,) { }

  public area_seleccionada:string="";
  areaList: any = []; //Almacena las áreas para mostrarlas en los select

  id = Number(this.route.snapshot.paramMap.get('id'));
  idArea = Number(this.route.snapshot.paramMap.get('idArea'));
  idObjetivo:number = Number(this.route.snapshot.paramMap.get('idObjetivo'));
  idDimension:number = Number(this.route.snapshot.paramMap.get('idDimension'));
  idPei:number = Number(this.route.snapshot.paramMap.get('idPei'));
  idInsti:number = Number(this.route.snapshot.paramMap.get('idInsti'));
  ngOnInit(): void {
    this.getArea();
  }

//Método que obtiene las áreas mediante el servico creado
async getArea(){
  this.resultadosService.getArea().subscribe((data:any) =>console.log(data));
  this.resultadosService.getArea().subscribe((data:any) =>this.areaList = data);
}

getResultado(id: number): void {
  this.resultadosService.getResultado(id).subscribe({
    next: resultado => {this.resultados = resultado},
    error: err => this.errorMessage = err
  });
}

public resultado:FormGroup = new FormGroup({
  nombre: new FormControl('',[Validators.required]),
  descripcion: new FormControl('',[Validators.required]),
  idArea: new FormControl('',[Validators.required]),
})

onBack(): void {
  this.router.navigate(['/gestion_pei/resultados/list/',this.idArea]);
}
  //Método para crear un nuevo resultado

  async crear_Resultado(nombre:string, descripcion:string){
    await this.resultadosService.crearResultado(nombre,descripcion,this.idArea).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.onBack();
      
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 1500
        
      })
      
    });
    
  }
  
}
