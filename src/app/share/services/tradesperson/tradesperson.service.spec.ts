import { TestBed } from '@angular/core/testing';

import { TradespersonService } from './tradesperson.service';

describe('TradespersonService', () => {
  let service: TradespersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradespersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
