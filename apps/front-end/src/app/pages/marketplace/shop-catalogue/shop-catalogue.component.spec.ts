import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCatalogueComponent } from './shop-catalogue.component';

describe('ShopCatalogueComponent', () => {
  let component: ShopCatalogueComponent;
  let fixture: ComponentFixture<ShopCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopCatalogueComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
