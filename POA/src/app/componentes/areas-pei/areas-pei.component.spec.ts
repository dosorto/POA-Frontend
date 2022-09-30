import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasPEIComponent } from './areas-pei.component';

describe('AreasPEIComponent', () => {
  let component: AreasPEIComponent;
  let fixture: ComponentFixture<AreasPEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasPEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasPEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
