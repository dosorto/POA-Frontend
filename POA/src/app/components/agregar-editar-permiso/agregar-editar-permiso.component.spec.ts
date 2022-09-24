import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPermisoComponent } from './agregar-editar-permiso.component';

describe('AgregarEditarPermisoComponent', () => {
  let component: AgregarEditarPermisoComponent;
  let fixture: ComponentFixture<AgregarEditarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
