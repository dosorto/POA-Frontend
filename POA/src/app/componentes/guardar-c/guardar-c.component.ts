import { Component, OnInit } from '@angular/core';
import { ContraseñaService } from 'src/app/Services/contraseña.service';
import { Contra } from 'src/app/models/Contra';

@Component({
  selector: 'app-guardar-c',
  templateUrl: './guardar-c.component.html',
  styleUrls: ['./guardar-c.component.css']
})
export class GuardarCComponent implements OnInit {
  ListarContrasena: Contra[] = [];
  constructor(private _contraseñaService: ContraseñaService) { }

  ngOnInit(): void {
  }

  CambiarContrasena() {
    this._contraseñaService.getContrasena().subscribe(data => {
      console.log(data);
      this.ListarContrasena = data;
    }, error => {
      console.log(error)
    })
  }


}