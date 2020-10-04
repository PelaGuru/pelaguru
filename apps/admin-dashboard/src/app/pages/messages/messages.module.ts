import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { SellerMessagesComponent } from './seller-messages/seller-messages.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';

@NgModule({
  declarations: [
    MessagesComponent,
    SellerMessagesComponent,
    UserMessagesComponent,
  ],
  imports: [CommonModule, MessagesRoutingModule],
})
export class MessagesModule {}
