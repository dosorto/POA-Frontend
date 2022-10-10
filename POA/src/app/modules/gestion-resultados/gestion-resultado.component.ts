import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ResultadoService } from './resultado.service';
import { resultado } from './resultado.interface';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-resultado',
  templateUrl: './gestion-resultado.component.html',
  styleUrls: ['./gestion-resultado.component.css']
})
export class GestionResultadoComponent implements OnInit {
  resultadoList: any = [];
  _delete: any;

  constructor(private Storage:Storage, private ResultadoService:ResultadoService, private router: Router, private toastr:ToastrService) { }
 
  public resultado:FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    idArea: new FormControl('', [Validators.required]),
    idObjetivos: new FormControl('', [Validators.required]),
    idDimension: new FormControl('', [Validators.required]),
    idPei: new FormControl('', [Validators.required])

  })

  ngOnInit(): void {
    this.getResultado();
  }

  async getResultado(){

    this.ResultadoService.getResultado().subscribe((data:any) => {
      this.resultadoList = data.allResultado;
      console.log(data);
  })
}

postResultado(form:resultado):any{
  this.ResultadoService.postResultado(form).subscribe(response =>{
    console.log(response);
    window.location.reload();
    this.resultado.reset();
  })

}

set_id_delete(id:Number){
  this._delete = id;
  console.log(this._delete)
}
async delete() {
  await this.ResultadoService.eliminarObjetivo(this._delete);
  window.location.reload();
}
}
