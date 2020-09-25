import * as functions from 'firebase-functions';
import { Logger } from '../utils/logger';
import { AuthService } from '../services/auth.service';
import { UserRole } from '@pelaguru/interfaces';

const authService = new AuthService();

// In the scenario where user record is created through the local firebase auth client,
// the firestore record has to be created by this trigger
export const onNewUser = functions.auth.user().onCreate(async (user) => {
  const recordExists = await authService.hasFirestoreUserRecord(user.uid);

  if (!recordExists) {
    Logger.info(
      'User record does not exist in firestore. User should be created without using the API',
      user.toJSON()
    );
    Logger.info(
      'Creating firebase record for the newly created user, with Student role'
    );
    await authService.setUserRole(user.uid, UserRole.NormalUser);
    await authService.setFirestoreUserRecord(user, UserRole.NormalUser);
  } else {
    Logger.info(
      'User record exists in firestore already. User should have been created through the API',
      user.toJSON()
    );
  }
});

export const onDeleteUser = functions.auth.user().onDelete(async (user) => {
  Logger.info('Deleting firebase record for the deleted user', user.toJSON());
  await authService.deleteFirestoreUserRecord(user.uid);
});
