import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllChemicalsComponent } from './all-chemicals.component';

describe('AllChemicalsComponent', () => {
  let component: AllChemicalsComponent;
  let fixture: ComponentFixture<AllChemicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllChemicalsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllChemicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
