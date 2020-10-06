import { TestBed } from '@angular/core/testing';

import { ChemicalService } from './chemical.service';

describe('ChemicalService', () => {
  let service: ChemicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChemicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
