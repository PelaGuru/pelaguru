import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChatRightItemComponent } from './message-chat-right-item.component';

describe('MessageChatRightItemComponent', () => {
  let component: MessageChatRightItemComponent;
  let fixture: ComponentFixture<MessageChatRightItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageChatRightItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChatRightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
