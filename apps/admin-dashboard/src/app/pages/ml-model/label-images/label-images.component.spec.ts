import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelImagesComponent } from './label-images.component';

describe('LabelImagesComponent', () => {
  let component: LabelImagesComponent;
  let fixture: ComponentFixture<LabelImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelImagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
