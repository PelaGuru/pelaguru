import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShopItemComponent } from './view-shop-item.component';

describe('ViewShopItemComponent', () => {
  let component: ViewShopItemComponent;
  let fixture: ComponentFixture<ViewShopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShopItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
