import { TestBed } from '@angular/core/testing';
import { AreaService } from './area.service';


describe('ObjetivosService', () => {
  let service: AreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});