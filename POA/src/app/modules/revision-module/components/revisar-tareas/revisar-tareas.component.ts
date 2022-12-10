import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PoaService } from 'src/app/modules/poa-module/services-poa/poa.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';


@Component({
  selector: 'app-revisar-tareas',
  templateUrl: './revisar-tareas.component.html',
  styleUrls: ['./revisar-tareas.component.css']
})
export class RevisarTareasComponent implements OnInit {

  constructor(private Storage: Storage,
    private service: PoaService,
    private router: Router,
    private _route: ActivatedRoute
    ) { }

  ngOnInit(): void {

  }


}
