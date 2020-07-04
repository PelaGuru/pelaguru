import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopDetailsComponent } from './edit-shop-details.component';

describe('EditShopDetailsComponent', () => {
  let component: EditShopDetailsComponent;
  let fixture: ComponentFixture<EditShopDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditShopDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
