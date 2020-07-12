import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageChatContainerData } from '@pelaguru/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageChatContainerService {
  private static messageData: BehaviorSubject<
    MessageChatContainerData
  > = new BehaviorSubject<MessageChatContainerData>({ isOpen: false });
  constructor() {}

  openChat(data: MessageChatContainerData): void {
    MessageChatContainerService.messageData.next(data);
  }

  getChatData(): Observable<MessageChatContainerData> {
    return MessageChatContainerService.messageData.asObservable();
  }
}
