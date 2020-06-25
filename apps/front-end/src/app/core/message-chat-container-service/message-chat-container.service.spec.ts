import { TestBed } from '@angular/core/testing';

import { MessageChatContainerService } from './message-chat-container.service';

describe('MessageChatContainerService', () => {
  let service: MessageChatContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageChatContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
