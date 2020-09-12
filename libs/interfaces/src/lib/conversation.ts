import { BaseModel } from './common/base-model';
import { Message } from './message';

export interface Conversation extends BaseModel {
  conversationId: string;
  subjectId: string;
  subjectName: string;
  lastMessage: Message;
  subjectAvatar: string;
}
