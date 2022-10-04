import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  rutaActual = "home";
  user = this.Storage.get_storage("user");
  constructor(private Storage:Storage) { 
    
  }
  
  ngOnInit(): void {
    
  }

}
