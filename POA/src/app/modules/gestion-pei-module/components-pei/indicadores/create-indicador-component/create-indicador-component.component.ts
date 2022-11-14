import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Indicador } from '../../../interfaces-pei/indicadores.model'; 
import { IndicadoresService } from '../../../services-pei/indicadores.service'; 

@Component({
  selector: 'app-create-indicador-component',
  templateUrl: './create-indicador-component.component.html',
  styleUrls: ['./create-indicador-component.component.css']
})
export class CreateIndicadorComponentComponent implements OnInit {

  errorMessage = '';
  indicador: Indicador | undefined;

  constructor(private indicadoresService:IndicadoresService,
              private router: Router,  
              private route: ActivatedRoute) { }

              public resultado_seleccionada:string="";
              resultadoList: any = []; //Almacena los resultados para mostrarlas en los select
            
              id = Number(this.route.snapshot.paramMap.get('id'));
              idResultado = Number(this.route.snapshot.paramMap.get('idResultado'));
              ngOnInit(): void {
                this.getResultado();
              }
            
            //Método que obtiene las áreas mediante el servico creado
            async getResultado(){
              this.indicadoresService.getResultado().subscribe((data:any) =>console.log(data));
              this.indicadoresService.getResultado().subscribe((data:any) =>this.resultadoList = data);
            }
            
            getIndicador(id: number): void {
              this.indicadoresService.getIndicador(id).subscribe({
                next: indicador => {this.indicador = indicador},
                error: err => this.errorMessage = err
              });
            }
            
            public indicadores:FormGroup = new FormGroup({
              nombre: new FormControl('',[Validators.required]),
              descripcion: new FormControl('',[Validators.required]),
              idResultado: new FormControl('',[Validators.required]),
            })
            
            onBack(): void {
              this.router.navigate(['/gestion_pei/indicadores/list/',this.idResultado]);
            }
              //Método para crear un nuevo resultado
            
              async crear_Indicador(nombre:string, descripcion:string){
                await this.indicadoresService.crearIndicador(nombre,descripcion,this.idResultado).subscribe((res:any)=>{
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
