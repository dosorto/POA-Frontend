import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { area } from '../models/area';
import { AreaService } from '../Services/area.service';

@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls:['./crear-area.component.css']
})
export class CrearAreaComponent implements OnInit {
  areaForm: FormGroup;

  constructor(private _areaService: AreaService,
    private fb: FormBuilder,
    private router: Router) {

      this.areaForm = this.fb.group({
        nombre: ['', Validators.required],
        idObjetivo: ['', Validators.required],
        idDimension: ['', Validators.required],
        idPEI: ['', Validators.required]
  })
     }

  ngOnInit(): void {

  }
  agregarArea(){
    const AREA: area = {
      nombre: this.areaForm.get('nombre')?.value,
      idObjetivo: this.areaForm.get('idObjetivo')?.value,
      idDimension: this.areaForm.get('idDimension')?.value,
      idPEI: this.areaForm.get('idPEI')?.value,


  }
  console.log(AREA);
  this._areaService.insertarArea(AREA).subscribe(data => {
    console.log('Agregado');
  }, error =>
    console.log(error));
  this.areaForm.reset();


}
}