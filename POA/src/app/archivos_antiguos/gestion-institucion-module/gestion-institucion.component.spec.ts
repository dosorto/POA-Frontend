import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInstitucionComponent } from './gestion-institucion.component';

describe('GestionInstitucionComponent', () => {
  let component: GestionInstitucionComponent;
  let fixture: ComponentFixture<GestionInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionInstitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
