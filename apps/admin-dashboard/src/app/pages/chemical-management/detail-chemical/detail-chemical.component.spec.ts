import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChemicalComponent } from './detail-chemical.component';

describe('DetailChemicalComponent', () => {
  let component: DetailChemicalComponent;
  let fixture: ComponentFixture<DetailChemicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailChemicalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
