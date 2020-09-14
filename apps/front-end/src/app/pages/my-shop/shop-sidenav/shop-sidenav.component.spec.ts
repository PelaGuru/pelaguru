import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSidenavComponent } from './shop-sidenav.component';

describe('ShopSidenavComponent', () => {
  let component: ShopSidenavComponent;
  let fixture: ComponentFixture<ShopSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopSidenavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
