import { TestBed } from '@angular/core/testing';

import { DatenightService } from './datenight.service';

describe('DatenightService', () => {
  let service: DatenightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
