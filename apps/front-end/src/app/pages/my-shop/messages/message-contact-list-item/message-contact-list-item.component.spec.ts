import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContactListItemComponent } from './message-contact-list-item.component';

describe('MessageContactListItemComponent', () => {
  let component: MessageContactListItemComponent;
  let fixture: ComponentFixture<MessageContactListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageContactListItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContactListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
