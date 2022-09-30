import { TestBed } from '@angular/core/testing';

import { AreasPEIService } from './areas-pei.service';

describe('AreasPEIService', () => {
  let service: AreasPEIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasPEIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
