import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPEIComponent } from './all-pei.component';

describe('AllPEIComponent', () => {
  let component: AllPEIComponent;
  let fixture: ComponentFixture<AllPEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
