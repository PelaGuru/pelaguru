import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopVisibilityComponent } from './shop-visibility.component';

describe('ShopVisibilityComponent', () => {
  let component: ShopVisibilityComponent;
  let fixture: ComponentFixture<ShopVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopVisibilityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
