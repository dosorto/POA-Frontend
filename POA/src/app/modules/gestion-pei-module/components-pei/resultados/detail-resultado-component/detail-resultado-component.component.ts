import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Resultado } from '../../../interfaces-pei/resultado.model';
import { ResultadosService } from '../../../services-pei/resultados.service';


@Component({
  selector: 'app-detail-resultado-component',
  templateUrl: './detail-resultado-component.component.html',
  styleUrls: ['./detail-resultado-component.component.css']
})
export class DetailResultadoComponentComponent implements OnInit {

  pageTitle = 'Resultado Detail';
  errorMessage = '';
  resultado: Resultado | undefined;
  _delete:any;
 
   constructor(private route: ActivatedRoute, 
                private router: Router, 
                private resultadosService:ResultadosService) { }
                ide = Number(this.route.snapshot.paramMap.get('id'));
                ngOnInit(){
                  const id = Number(this.route.snapshot.paramMap.get('id'));
                  console.log("aqui ")
                  this.getResultado(id);
                  console.log(id)
                  if (id) {
                    this.getResultado(id);  
                    console.log(this.resultado?.id)
                  }
                  console.log(this.resultado?.id)
                
                  }
                  getResultado(id: number): void {
                    this.resultadosService.getResultado(id).subscribe({
                      next: resultado => {this.resultado = resultado},
                      error: err => this.errorMessage = err
                    });
                  }
                  onBack(): void {
                    this.router.navigate(['/gestion_pei/resultados/list/',this.resultado?.idArea]);
                  }

                  onBackGestion(): void {
                    this.router.navigate(['/gestion_pei/resultados/list/',this.resultado?.idArea]);
                  }

                  set_id_delete(id:any){
                    this._delete = id;
                    console.log(this._delete)
                  }
              
                  // metodos para eliminar
                  async delete() {
                    
                    await this.resultadosService.eliminarResultado(this._delete)
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
                      
                    })
                    this.onBackGestion();
                    // setTimeout(function() {
                    //   window.location.reload();
                    // },3000);
                    
                      
                    // window.location.reload();
                    
                  }

                }