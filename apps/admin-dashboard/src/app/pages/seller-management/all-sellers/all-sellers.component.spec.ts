import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellersComponent } from './all-sellers.component';

describe('AllSellersComponent', () => {
  let component: AllSellersComponent;
  let fixture: ComponentFixture<AllSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllSellersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
