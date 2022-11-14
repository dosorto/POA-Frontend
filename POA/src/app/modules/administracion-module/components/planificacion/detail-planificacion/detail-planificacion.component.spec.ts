import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlanificacionComponent } from './detail-planificacion.component';

describe('DetailPlanificacionComponent', () => {
  let component: DetailPlanificacionComponent;
  let fixture: ComponentFixture<DetailPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPlanificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
