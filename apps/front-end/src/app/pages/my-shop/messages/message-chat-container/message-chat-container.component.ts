import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pelaguru-message-chat-container',
  templateUrl: './message-chat-container.component.html',
  styleUrls: ['./message-chat-container.component.scss']
})
export class MessageChatContainerComponent implements OnInit {
  @Output() closeChat: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  closeC(): void {
    this.closeChat.emit(true);
  }
}
