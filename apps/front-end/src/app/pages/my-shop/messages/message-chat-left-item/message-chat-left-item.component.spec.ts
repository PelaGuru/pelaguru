import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChatLeftItemComponent } from './message-chat-left-item.component';

describe('MessageChatLeftItemComponent', () => {
  let component: MessageChatLeftItemComponent;
  let fixture: ComponentFixture<MessageChatLeftItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageChatLeftItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChatLeftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
