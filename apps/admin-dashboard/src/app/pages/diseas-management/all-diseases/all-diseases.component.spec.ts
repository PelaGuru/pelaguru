import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiseasesComponent } from './all-diseases.component';

describe('AllDiseasesComponent', () => {
  let component: AllDiseasesComponent;
  let fixture: ComponentFixture<AllDiseasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllDiseasesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
