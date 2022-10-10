import { TestBed } from '@angular/core/testing';

import { PeiService } from './pei.service';

describe('PeiService', () => {
  let service: PeiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
