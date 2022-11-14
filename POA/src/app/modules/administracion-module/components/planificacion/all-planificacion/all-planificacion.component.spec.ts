import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlanificacionComponent } from './all-planificacion.component';

describe('AllPlanificacionComponent', () => {
  let component: AllPlanificacionComponent;
  let fixture: ComponentFixture<AllPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPlanificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
