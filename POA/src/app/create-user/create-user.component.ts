import { Component, OnInit } from '@angular/core';
import { empleado } from '../models/user.interface';
import { usuario } from '../models/userDatos.interface'
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../empleado/empleado.service';
import { RolService } from '../rol/rol.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  //listEmpleados: any = [];
   empleadoList: any = [];
   roleList: any = [];

  public usuario:FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(4)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    password2: new FormControl('',[Validators.required, Validators.minLength(8)]),
    idEmpleado: new FormControl('',[Validators.required]),
    idRol: new FormControl('',[Validators.required])

  })

  constructor(private UserService: UserService, private router:Router, private EmpleadoService: EmpleadoService, private RolService: RolService ) { }


  ngOnInit(): void {
    //this.mostrarUsuarios();
    /*console.log(this.usuario);
    this.UserService.getEmpleado().subscribe((list: any) => {
      console.log(list);
      this.listEmpleados = list.allEmpleados
    });*/
    console.log(this.usuario);
    this.getEmpleados();
    this.getRol();
  }

  //Función para obtener y mostrar los empleados.
  async getEmpleados(){
    this.EmpleadoService.getEmpleado().subscribe((response: any )=> console.log(response));
    this.EmpleadoService.getEmpleado().subscribe((response: any )=> this.empleadoList = response.empleados);
  }

  //Función para obtener y mostrar los roles.
  async getRol(){
    this.RolService.getRol().subscribe((response1: any )=> console.log(response1));
    this.RolService.getRol().subscribe((response1: any )=> this.roleList = response1.roles);
  }

  // Función para obtener los datos del formulario y almacenarlos.
  postUsuario(form:usuario):any {
    this.UserService.postUsuario(form).subscribe(data=>{
      console.log(data);
      this.usuario.reset();
    })
  }


  usuarioCreado() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Usuario creado con éxito',
      showConfirmButton: false,
      timer: 1500
    })
  }



}
