import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MessageChatContainerService } from '../../../core/message-chat-container-service/message-chat-container.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pelaguru-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  mobileQuery: MediaQueryList;
  @ViewChild('chatContainer', { static: true }) chatDrawer: MatSidenav;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private mediaMatcher: MediaMatcher,
    private messageChatContainerService: MessageChatContainerService
  ) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 700px)');
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  private mobileQueryListener = (): void => {
    if (this.mobileQuery.matches) {
      this.chatDrawer.close();
    } else {
      this.chatDrawer.open();
    }
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    const messageChatContainerServiceSubscription = this.messageChatContainerService
      .getChatData()
      .subscribe(response => {
        if (response.isOpen) {
          this.chatDrawer.open();
        }
      });
    this.chatDrawer.closedStart.subscribe(() => {
      this.messageChatContainerService.openChat({ isOpen: false });
    });
    this.subscriptions.push(messageChatContainerServiceSubscription);
  }

  ngOnInit(): void {}

  onChatClose(close: boolean): void {
    if (close) {
      this.chatDrawer.close();
    }
  }
}
