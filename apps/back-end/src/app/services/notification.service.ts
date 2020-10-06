import * as admin from 'firebase-admin';
import * as sendgrid from '@sendgrid/mail';
import {
  FirestoreOperation,
  PlatformNotification,
  User,
} from '@pelaguru/interfaces';
import { Logger } from '../utils/logger';
import { EmailTemplate } from '../models/email-template';
import { environment } from '../../environments/environment';

export class NotifcationService<parameters = any> {
  
  async sendEmailNotification(
    to: string[],
    templateName: EmailTemplate,
    parameters: parameters
  ): Promise<void> {
    const db = admin.firestore();
    const emailCol = db.collection('Emails');
    try {
      Logger.info('Sending email');
      const emailRecord = await emailCol.add({
        to,
        template: {
          name: templateName,
          data: parameters,
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      Logger.info('Email sent', emailRecord);
      return;
    } catch (error) {
      Logger.error('Could not send the email', error.message);
      throw error;
    }
  }

  async sendEmailNotificationWithSendgrid<T>(
    receiverId: string,
    templateName: EmailTemplate,
    parameters: T
  ): Promise<void> {
    sendgrid.setApiKey(environment.sendgridAPIKey);

    const db = admin.firestore();
    const userRef = db.doc(`Users/${receiverId}`);
    const user = (await userRef.get()).data() as User;

    const configuration: sendgrid.MailDataRequired = {
      from: 'noreply@pelaguru.lk',
      to: [
        {
          email: user.email,
          name: user.displayName,
        },
      ],
      templateId: environment.emailTemplateIds[templateName],
      dynamicTemplateData: parameters,
    };

    Logger.debug('Sending email via Sendgrid API', configuration);
    await sendgrid.send(configuration);
  }

  async sendPlatformNotification(
    receiverId: string,
    title: string,
    message: string,
    actionUrl?: string,
    actionText?: string
  ): Promise<void> {
    try {
      const db = admin.firestore();

      const userRef = db.doc(`Users/${receiverId}`);
      const notificationRef = db
        .collection(`Users/${receiverId}/Notifications`)
        .doc();
      const platformNotification: FirestoreOperation<PlatformNotification> = {
        platformNotificationId: notificationRef.id,
        userId: receiverId,
        title,
        message,
        notificationViewed: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (actionUrl) {
        platformNotification.actionUrl = actionUrl;
        if (actionText) {
          platformNotification.actionText = actionText;
        }
      }

      await db.runTransaction(async (transaction) => {
        const user = await transaction.get(userRef);
        const unreadNotificationsCount = user.get('unreadNotificationCount')
          ? user.get('unreadNotificationCount')
          : 0;
        transaction.create(notificationRef, platformNotification);
        transaction.update(userRef, {
          unreadNotificationCount: unreadNotificationsCount + 1,
        });
      });
    } catch (error) {
      Logger.error(
        'Could not send platform notification to user',
        error.message
      );
      throw error;
    }
  }

  async markNotificationsAsViewed(userId: string): Promise<void> {
    try {
      const db = admin.firestore();
      const userRef = db.doc(`Users/${userId}`);
      const unreadNotificationsRef = db
        .collection(`Users/${userId}/Notifications`)
        .where('notificationViewed', '==', false);
      await db.runTransaction(async (transaction) => {
        const unreadNotifications = await transaction.get(
          unreadNotificationsRef
        );
        const user = await transaction.get(userRef);
        const unreadNotificationsCount = user.get('unreadNotificationCount')
          ? user.get('unreadNotificationCount')
          : 0;

        for (const notification of unreadNotifications.docs) {
          transaction.update(notification.ref, { notificationViewed: true });
        }
        // should result with zero unreadNotifications
        transaction.update(userRef, {
          unreadNotificationCount:
            unreadNotificationsCount - unreadNotifications.docs.length,
        });
      });

      Logger.info('Marked notifications as viewed');
    } catch (error) {
      Logger.error('Could not mark notifications as viewed', error.message);
      throw error;
    }
  }

  async getPlatformNotificationsOfUser(
    userId: string,
    limit: number,
    lastNotificationId?: string
  ): Promise<PlatformNotification[]> {
    try {
      const db = admin.firestore();
      let notificationsRef = db
        .collection('Users')
        .doc(userId)
        .collection('Notifications')
        .orderBy('createdAt', 'desc')
        .limit(limit);

      if (lastNotificationId) {
        const lastNotificationSnapshot = await db
          .doc(`Users/${userId}/Notifications/${lastNotificationId}`)
          .get();
        notificationsRef = notificationsRef.startAfter(
          lastNotificationSnapshot
        );
      }

      const notificationsSnapshot = await notificationsRef.get();
      return notificationsSnapshot.docs.map(
        (notification) => notification.data() as PlatformNotification
      );
    } catch (error) {
      Logger.error(
        'Could not get the platform notifications from firestore',
        error.message
      );
      throw error;
    }
  }
}
