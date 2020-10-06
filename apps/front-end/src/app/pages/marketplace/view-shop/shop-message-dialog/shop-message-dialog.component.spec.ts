import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMessageDialogComponent } from './shop-message-dialog.component';

describe('ShopMessageDialogComponent', () => {
  let component: ShopMessageDialogComponent;
  let fixture: ComponentFixture<ShopMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
