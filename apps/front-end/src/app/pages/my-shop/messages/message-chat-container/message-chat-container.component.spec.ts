import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChatContainerComponent } from './message-chat-container.component';

describe('MessageChatContainerComponent', () => {
  let component: MessageChatContainerComponent;
  let fixture: ComponentFixture<MessageChatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageChatContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
