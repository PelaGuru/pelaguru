import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesCatalogueComponent } from './diseases-catalogue.component';

describe('DiseasesCatalogueComponent', () => {
  let component: DiseasesCatalogueComponent;
  let fixture: ComponentFixture<DiseasesCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiseasesCatalogueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasesCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
