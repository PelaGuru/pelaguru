import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { SellerMessagesComponent } from './seller-messages/seller-messages.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [
      { path: 'sellers', component: SellerMessagesComponent },
      { path: 'users', component: UserMessagesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
