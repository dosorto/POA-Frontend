import { Component, OnInit } from '@angular/core';
import { ContraseñaService } from 'src/app/Services/contraseña.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  title = 'POA';

  constructor(){
    console.log('el componente se ha creado');
  }

  ngOnInit(): void{
    console.log('el componente se ha inicializado');
  }
}
