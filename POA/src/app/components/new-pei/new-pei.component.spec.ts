import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPEIComponent } from './new-pei.component';

describe('NewPEIComponent', () => {
  let component: NewPEIComponent;
  let fixture: ComponentFixture<NewPEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
