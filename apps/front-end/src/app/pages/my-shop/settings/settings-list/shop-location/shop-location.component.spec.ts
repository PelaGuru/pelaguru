import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLocationComponent } from './shop-location.component';

describe('ShopLocationComponent', () => {
  let component: ShopLocationComponent;
  let fixture: ComponentFixture<ShopLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopLocationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
