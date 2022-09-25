import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPEIComponent } from './list-pei.component';

describe('ListPEIComponent', () => {
  let component: ListPEIComponent;
  let fixture: ComponentFixture<ListPEIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPEIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPEIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
