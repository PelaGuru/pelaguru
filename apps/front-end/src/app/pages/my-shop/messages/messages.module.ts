import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { SharedModule } from '../../../shared/shared.module';
import { MessageContactListComponent } from './message-contact-list/message-contact-list.component';
import { MessageChatContainerComponent } from './message-chat-container/message-chat-container.component';
import { MessageContactListItemComponent } from './message-contact-list-item/message-contact-list-item.component';
import { MessageChatLeftItemComponent } from './message-chat-left-item/message-chat-left-item.component';
import { MessageChatRightItemComponent } from './message-chat-right-item/message-chat-right-item.component';
import { MessageChatContainerService } from '../../../core/message-chat-container-service/message-chat-container.service';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageContactListComponent,
    MessageChatContainerComponent,
    MessageContactListItemComponent,
    MessageChatLeftItemComponent,
    MessageChatRightItemComponent
  ],
  imports: [CommonModule, MessagesRoutingModule, SharedModule],
  providers: [MessageChatContainerService]
})
export class MessagesModule {}
