import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PEI } from 'src/app/models/pei';
import { PEIService } from 'src/app/SERVICES/new-pei.service';

import 'sweetalert2/src/sweetalert2.js'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pei',
  templateUrl: './new-pei.component.html',
  styleUrls: ['./new-pei.component.css']
})
export class InsertPEIComponent implements OnInit {
  PEIForm: FormGroup;

  constructor(private _peiService: PEIService,
              private fb: FormBuilder,
              private router: Router) {

              this.PEIForm = this.fb.group({
                  name : ['', Validators.required],
                  initialYear : ['', Validators.required],
                  finalYear : ['', Validators.required]
                })
               }

  ngOnInit(): void {
  }
  addPEI(){

    const PEIS: PEI = {
      name: this.PEIForm.get('name')?.value,
      initialYear: this.PEIForm.get('initialYear')?.value,
      finalYear: this.PEIForm.get('finalYear')?.value,
    }
    console.log(PEIS);
    Swal.fire({
      icon: 'success',
      title: '¡Nuevo PEI registrado exitosamente!',
      showConfirmButton: false,
      timer: 2500
    })

  this._peiService.createPEI(PEIS).subscribe(data =>{
    console.log('Agregado');
  }, error =>
    console.log(error));
    this.PEIForm.reset();


  }

}
