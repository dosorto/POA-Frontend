import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { ObjetivosService } from '../../../services-pei/objetivos.service';
@Component({
  selector: 'app-detail-objetivo-component',
  templateUrl: './detail-objetivo-component.component.html',
  styleUrls: ['./detail-objetivo-component.component.css']
})
export class DetailObjetivoComponentComponent implements OnInit {
  pageTitle:string= 'Objetivo Detail';
  errorMessage = '';
  objetivo: Objetivo | undefined
  _delete:any;
   constructor(private _route: ActivatedRoute, private _router: Router, private ObjetivoService:ObjetivosService) { }

  ngOnInit(){
    const id = Number(this._route.snapshot.paramMap.get('id'));
    console.log("aqui ")
    console.log(id)
    if (id) {
      this.getObjetivoss(id);  
    }
    console.log(this.objetivo?.id)
  
   
    }
    getObjetivoss(id: number): void {
      this.ObjetivoService.getObjetivo(id).subscribe({
        next: objetivo => {this.objetivo = objetivo},
        error: err => this.errorMessage = err
      });
    }
    onBack(): void {
      this._router.navigate(['/gestion_pei/objetivos/list']);
    }


    set_id_delete(id:any){
      this._delete = id;
      console.log(this._delete)
    }

    // metodos para eliminar
    async delete() {
      
      await this.ObjetivoService.eliminarObjetivo(this._delete)
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
      this.onBack();
      // setTimeout(function() {
      //   window.location.reload();
      // },3000);
      
        
      // window.location.reload();
      
    }
    
  }