import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-pei',
  templateUrl: './delete-pei.component.html',
  styleUrls: ['./delete-pei.component.css']
})
export class DeletePeiComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

  }
}
