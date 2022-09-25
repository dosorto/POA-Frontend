import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAgregarActualizarDesactivarPeiComponent } from './all-agregar-actualizar-desactivar-pei.component';

describe('AllAgregarActualizarDesactivarPeiComponent', () => {
  let component: AllAgregarActualizarDesactivarPeiComponent;
  let fixture: ComponentFixture<AllAgregarActualizarDesactivarPeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAgregarActualizarDesactivarPeiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAgregarActualizarDesactivarPeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
