import { TestBed } from '@angular/core/testing';

import { DiseasService } from './diseas.service';

describe('DiseasService', () => {
  let service: DiseasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
