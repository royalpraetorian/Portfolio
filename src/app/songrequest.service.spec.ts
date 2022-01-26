import { TestBed } from '@angular/core/testing';

import { SongrequestService } from './songrequest.service';

describe('SongrequestService', () => {
  let service: SongrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
