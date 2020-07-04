import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopItemComponent } from './add-shop-item.component';

describe('AddShopItemComponent', () => {
  let component: AddShopItemComponent;
  let fixture: ComponentFixture<AddShopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddShopItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
