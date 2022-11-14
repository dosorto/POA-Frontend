import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanificacionComponent } from './create-planificacion.component';

describe('CreatePlanificacionComponent', () => {
  let component: CreatePlanificacionComponent;
  let fixture: ComponentFixture<CreatePlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlanificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
