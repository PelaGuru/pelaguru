import * as express from 'express';
import { EmailTemplate } from '../models/email-template';
import { NotifcationService } from '../services/notification.service';

import { makeResponse } from '../utils/response-creator';

export const versionRouter = express.Router();

const notificationService = new NotifcationService();

versionRouter.post('/', async (req, res) => {
  try {
    await notificationService.sendEmailNotificationWithSendgrid(
      'cQBIM3q3zNQUXffImmcDR8NVUxs2',
      EmailTemplate.WelcomeEmail,
      { name: 'Nishan' }
    );
    res.send(makeResponse(true, 'Version: 1.0', 200));
  } catch (error) {
    console.log();
    res.send(makeResponse(true, 'Version: 1.0', 200, 123, error));
  }
});
