import { Component, OnInit } from '@angular/core';
import { ContraseñaService } from 'src/app/Services/contraseña.service';

@Component({
  selector: 'app-guardar-c',
  templateUrl: './guardar-c.component.html',
  styleUrls: ['./guardar-c.component.css']
})
export class GuardarCComponent implements OnInit {

  constructor(private ContraseñaService:ContraseñaService) { }

  ngOnInit(): void {
    this.ListarContrasena();
  }

  ListarContrasena()
  {
    this.ContraseñaService.getContrasena().subscribe(
      res=>{
        console.log(res)
      },
      err => console.log(err)
    );
  }
}
