import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPeiComponent } from './pei.component';

describe('GestionPeiComponent', () => {
  let component: GestionPeiComponent;
  let fixture: ComponentFixture<GestionPeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPeiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
