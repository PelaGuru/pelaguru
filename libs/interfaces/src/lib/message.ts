import { BaseModel } from './common/base-model';

export interface Message extends BaseModel {
  messageId: string;
  conversationId: string;
  senderId: string;
  message?: string;
  fileUrls?: { url: string; icon: string; type: string }[];
  senderName: string;
  type: 'text' | 'file' | 'map' | 'quete';
  senderImageUrl?: string;
  reply?: boolean;
}
