import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiseasComponent } from './edit-diseas.component';

describe('EditDiseasComponent', () => {
  let component: EditDiseasComponent;
  let fixture: ComponentFixture<EditDiseasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDiseasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
