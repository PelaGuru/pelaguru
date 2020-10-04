import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalManagementComponent } from './chemical-management.component';

describe('ChemicalManagementComponent', () => {
  let component: ChemicalManagementComponent;
  let fixture: ComponentFixture<ChemicalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChemicalManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
