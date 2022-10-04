import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarCComponent } from './guardar-c.component';

describe('GuardarCComponent', () => {
  let component: GuardarCComponent;
  let fixture: ComponentFixture<GuardarCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
