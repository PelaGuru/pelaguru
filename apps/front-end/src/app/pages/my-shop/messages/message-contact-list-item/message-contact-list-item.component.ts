import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { MessageChatContainerService } from 'apps/front-end/src/app/core/message-chat-container-service/message-chat-container.service';

@Component({
  selector: 'pelaguru-message-contact-list-item',
  templateUrl: './message-contact-list-item.component.html',
  styleUrls: ['./message-contact-list-item.component.scss']
})
export class MessageContactListItemComponent implements OnInit {
  constructor(
    private messageChatContainerService: MessageChatContainerService
  ) {}

  ngOnInit(): void {}

  openChat(): void {
    this.messageChatContainerService.openChat({ isOpen: true });
  }
}
