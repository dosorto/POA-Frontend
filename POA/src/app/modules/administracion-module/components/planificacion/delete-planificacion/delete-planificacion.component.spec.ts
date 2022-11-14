import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlanificacionComponent } from './delete-planificacion.component';

describe('DeletePlanificacionComponent', () => {
  let component: DeletePlanificacionComponent;
  let fixture: ComponentFixture<DeletePlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlanificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
