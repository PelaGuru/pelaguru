import { TestBed } from '@angular/core/testing';

import { RightDrawerServiceService } from './right-drawer-service.service';

describe('RightDrawerServiceService', () => {
  let service: RightDrawerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightDrawerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
