import { BaseModel } from './common/base-model';

export interface PlatformNotification extends BaseModel {
  platformNotificationId: string;
  userId: string;
  title: string;
  message: string;

  actionUrl?: string;
  actionText?: string;

  notificationViewed: boolean;
}
