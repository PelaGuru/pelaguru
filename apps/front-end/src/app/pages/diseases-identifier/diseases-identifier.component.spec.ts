import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesIdentifierComponent } from './diseases-identifier.component';

describe('DiseasesIdentifierComponent', () => {
  let component: DiseasesIdentifierComponent;
  let fixture: ComponentFixture<DiseasesIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiseasesIdentifierComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasesIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
