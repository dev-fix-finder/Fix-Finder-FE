import { TestBed } from '@angular/core/testing';

import { JobPoolService } from './job-pool.service';

describe('JobPoolService', () => {
  let service: JobPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
