import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { permiso } from 'src/app/interfaces/permiso';
import { AgregarEditarPermisoComponent } from '../agregar-editar-permiso/agregar-editar-permiso.component';


const listPermiso: permiso[] = [
  {Permiso: "Actualizar tablas", Descripcion: "Este usuario puede actualizar las tablas. "},
];

@Component({
  selector: 'app-list-permisos',
  templateUrl: './list-permisos.component.html',
  styleUrls: ['./list-permisos.component.css']
})
export class ListPermisosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Permiso','Descripcion','Moves'];
  dataSource: MatTableDataSource<permiso>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(listPermiso)

   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Permisos por página"
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditPermiso(){
    const dialogRef = this.dialog.open(AgregarEditarPermisoComponent, {
      width: '550px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Esta ventana fue cerrada');
    })
  }
}
