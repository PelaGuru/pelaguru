import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopItemComponent } from './edit-shop-item.component';

describe('EditShopItemComponent', () => {
  let component: EditShopItemComponent;
  let fixture: ComponentFixture<EditShopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditShopItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
