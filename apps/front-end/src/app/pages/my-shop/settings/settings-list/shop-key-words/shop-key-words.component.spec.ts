import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopKeyWordsComponent } from './shop-key-words.component';

describe('ShopKeyWordsComponent', () => {
  let component: ShopKeyWordsComponent;
  let fixture: ComponentFixture<ShopKeyWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopKeyWordsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopKeyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
