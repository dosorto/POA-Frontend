import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

 
   constructor(private route: ActivatedRoute, 
                private router: Router, 
                private resultadosService:ResultadosService) { }

                ngOnInit(){
                  const id = Number(this.route.snapshot.paramMap.get('id'));
                  console.log("aqui ")
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
                    this.router.navigate(['/gestion_pei/resultados/list/:idArea']);
                  }
                }