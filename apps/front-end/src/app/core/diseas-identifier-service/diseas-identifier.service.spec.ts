import { TestBed } from '@angular/core/testing';

import { DiseasIdentifierService } from './diseas-identifier.service';

describe('DiseasIdentifierService', () => {
  let service: DiseasIdentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseasIdentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
