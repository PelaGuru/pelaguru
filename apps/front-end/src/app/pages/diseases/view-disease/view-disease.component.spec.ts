import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiseaseComponent } from './view-disease.component';

describe('ViewDiseaseComponent', () => {
  let component: ViewDiseaseComponent;
  let fixture: ComponentFixture<ViewDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDiseaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
