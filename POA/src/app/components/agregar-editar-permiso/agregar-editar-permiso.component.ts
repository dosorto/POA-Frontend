import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { permiso } from 'src/app/interfaces/permiso';
@Component({
  selector: 'app-agregar-editar-permiso',
  templateUrl: './agregar-editar-permiso.component.html',
  styleUrls: ['./agregar-editar-permiso.component.css']
})
export class AgregarEditarPermisoComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AgregarEditarPermisoComponent>,
    private fb: FormBuilder) { 
      this.form = this.fb.group({
        Permiso: ['', Validators.required],
        Descripcion: ['']
      })

    }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

  addEditPermiso(){

    if(this.form.invalid){
      return;
    }
    const permiso: permiso = {
          Permiso: this.form.value.Permiso,
          Descripcion: this.form.value.Descripcion
    }
    console.log("Se agrego permiso");

  }

}
