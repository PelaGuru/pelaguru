import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiseasComponent } from './detail-diseas.component';

describe('DetailDiseasComponent', () => {
  let component: DetailDiseasComponent;
  let fixture: ComponentFixture<DetailDiseasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDiseasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
