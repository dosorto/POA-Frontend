import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-area',
  templateUrl: './update-area.component.html',
  styleUrls: ['./update-area.component.css']
})
export class UpdateAreaComponent implements OnInit {



  constructor(private Storage: Storage,
    private service: AreasService,
    private router: Router,
    private _route: ActivatedRoute) { }

  public idObjetivo: number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  public id: number = Number(this._route.snapshot.paramMap.get('id'));
  public area: Area | any = {};
  public nombre: string = '';
  errorMessage = '';

  ngOnInit(): void {
    this.initData();

    const id = Number(this._route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAreas(id);  
    }
    console.log(this.area?.id)
  }
  getAreas(id: number): void {
    this.service.getAreass(id).subscribe({
      next: area => {this.area = area},
      error: err => this.errorMessage = err
    });
  }

  async initData(){
    this.area = await this.service.getArea(this.id).subscribe((response:any)=>{
      this.area = response.area;
      console.log(response);
    }
    );
    console.log(this.area);
  }
  toDetail(){
    this.router.navigate(['/gestion_pei/areas/detail/',this.id,this.idObjetivo]);
  }

  toList() {
    this.router.navigate(['/gestion_pei/areas/list/', this.idObjetivo]);
  }


  update() {
    let nombre = this.nombre;

    // validaciones
    if ((nombre === '')) { nombre = this.area.nombre}

    try {
      this.service.updateArea(nombre, this.id,this.idObjetivo).subscribe((res: any) => {
        console.log(res);

      }, (error: any) => {
        console.log(error);
      });  
      Swal.fire({
        icon: 'success',
        title: '!Area actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function () {
        window.location.reload();
        
      }, 2500);
      this.toList();
    } catch (error) {
      console.log(error);
    }
  }


}

