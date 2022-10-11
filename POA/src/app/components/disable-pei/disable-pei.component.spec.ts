import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisablePEIComponent } from './disable-pei.component';

describe('DisablePEIComponent', () => {
  let component: DisablePEIComponent;
  let fixture: ComponentFixture<DisablePEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisablePEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisablePEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
