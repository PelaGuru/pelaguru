import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsCatalogueComponent } from './plants-catalogue.component';

describe('PlantsCatalogueComponent', () => {
  let component: PlantsCatalogueComponent;
  let fixture: ComponentFixture<PlantsCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlantsCatalogueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
