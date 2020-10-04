import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChemicalComponent } from './edit-chemical.component';

describe('EditChemicalComponent', () => {
  let component: EditChemicalComponent;
  let fixture: ComponentFixture<EditChemicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditChemicalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
