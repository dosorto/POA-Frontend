import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Indicador } from '../../../interfaces-pei/indicadores.model'; 
import { IndicadoresService } from '../../../services-pei/indicadores.service'; 

@Component({
  selector: 'app-detail-indicador-component',
  templateUrl: './detail-indicador-component.component.html',
  styleUrls: ['./detail-indicador-component.component.css']
})
export class DetailIndicadorComponentComponent implements OnInit {

  pageTitle = 'Indicador Detail';
  errorMessage = '';
  indicador: Indicador | undefined;
  _delete:any;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private indicadoresService:IndicadoresService) { }

    ide = Number(this.route.snapshot.paramMap.get('id'));
    id = Number(this.route.snapshot.paramMap.get('id'));
    public idResultado = Number(this.route.snapshot.paramMap.get('idResultado'));

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
                  console.log("aqui ")
                  this.getIndicador(id);
                  console.log(id)
                  if (id) {
                    this.getIndicador(id);  
                    console.log(this.indicador?.id)
                  }
                  console.log(this.indicador?.id)
  }
  getIndicador(id: number): void {
    this.indicadoresService.getIndicador(id).subscribe({
      next: indicador => {this.indicador = indicador},
      error: err => this.errorMessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/gestion_pei/indicadores/list/',this.indicador?.idResultado]);
  }

  onBackGestion(): void {
    this.router.navigate(['/gestion_pei/indicadores/list/',this.indicador?.idResultado]);
  }

  set_id_delete(id:any){
    this._delete = id;
    console.log(this._delete)
  }


  // metodos para eliminar
  async delete() {
    
    await this.indicadoresService.eliminarIndicador(this._delete)
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
    setTimeout(function() {
      window.location.reload();
    },100);
    
      
    // window.location.reload();
    
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/indicadores/update/',this.id,this.idResultado]);
  }

}
