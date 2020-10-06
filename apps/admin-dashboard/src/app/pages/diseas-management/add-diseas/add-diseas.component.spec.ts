import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiseasComponent } from './add-diseas.component';

describe('AddDiseasComponent', () => {
  let component: AddDiseasComponent;
  let fixture: ComponentFixture<AddDiseasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiseasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
