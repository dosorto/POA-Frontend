import { Component, OnInit } from '@angular/core';
import { Storage } from '../global-services/local_storage.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  user = this.local.get_storage("user");
  constructor(private local:Storage) { }

  ngOnInit(): void {
    
  }
  public desplegar(){
    
  }

}
