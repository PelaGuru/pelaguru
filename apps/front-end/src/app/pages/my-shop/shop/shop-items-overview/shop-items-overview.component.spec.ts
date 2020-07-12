import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemsOverviewComponent } from './shop-items-overview.component';

describe('ShopItemsOverviewComponent', () => {
  let component: ShopItemsOverviewComponent;
  let fixture: ComponentFixture<ShopItemsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopItemsOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopItemsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
