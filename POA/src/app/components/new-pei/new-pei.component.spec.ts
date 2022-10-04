import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPEIComponent } from './new-pei.component';

describe('NewPEIComponent', () => {
  let component: InsertPEIComponent;
  let fixture: ComponentFixture<InsertPEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertPEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertPEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
