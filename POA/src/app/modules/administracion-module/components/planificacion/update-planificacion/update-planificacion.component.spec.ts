import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlanificacionComponent } from './update-planificacion.component';

describe('UpdatePlanificacionComponent', () => {
  let component: UpdatePlanificacionComponent;
  let fixture: ComponentFixture<UpdatePlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlanificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
