import { TestBed } from '@angular/core/testing';

import { NavDrawerService } from './nav-drawer.service';

describe('NavDrawerService', () => {
  let service: NavDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
