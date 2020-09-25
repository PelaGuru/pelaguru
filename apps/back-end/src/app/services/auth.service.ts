import * as admin from 'firebase-admin';
import { Logger } from '../utils/logger';
import { UserRole, FirestoreOperation, User } from '@pelaguru/interfaces';

export class AuthService {
  async createFirebaseUser(
    email: string,
    password: string,
    displayName: string,
    userRole: UserRole,
    phoneNumber?: string,
    profilePictureUrl?: string
  ) {
    if (!email || !password || !displayName || !userRole) {
      throw new Error('Missing required parameters');
    }

    const auth = admin.auth();
    const db = admin.firestore();
    const userRef = db.collection('Users').doc();

    try {
      // Setting user role initially to prevent trigger from creating the document
      await userRef.set({ role: userRole });

      Logger.info('Creating new user record');
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
        phoneNumber,
        photoURL: profilePictureUrl,
        disabled: false,
        uid: userRef.id,
      });

      Logger.info('User record created', userRecord);
      await this.setUserRole(userRef.id, userRole);

      Logger.info('Updating firestore record');
      await this.setFirestoreUserRecord(userRecord, userRole);
      return userRecord.uid;
    } catch (error) {
      Logger.error(
        'Could not create new user account with firebase auth',
        error.message
      );
      this.deleteFirestoreUserRecord(userRef.id);
      throw error;
    }
  }

  async setUserRole(userId: string, role: UserRole) {
    try {
      const auth = admin.auth();

      Logger.info('Setting user role', { userId, role });
      await auth.setCustomUserClaims(userId, {
        role,
      });
      Logger.info('Done');
    } catch (error) {
      Logger.error('Could not set user role on firebase auth', error.message);
      throw error;
    }
  }

  async setFirestoreUserRecord(
    userRecord: admin.auth.UserRecord,
    userRole = UserRole.NormalUser
  ) {
    try {
      const db = admin.firestore();
      const ref = db.collection('Users').doc(userRecord.uid);
      Logger.info('Firebase auth user data', userRecord.toJSON());

      const user: FirestoreOperation<User> = {
        userId: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        profilePictureUrl: userRecord.photoURL,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        disabled: false,
        role: userRole,
      };

      // Check for third party providers (google/facebook) and get possible data from there
      for (const provider of userRecord.providerData) {
        Logger.info('Third party provider present', provider.providerId);
        user.email = user.email || provider.email;
        user.displayName = user.displayName || provider.displayName;
        user.profilePictureUrl = user.profilePictureUrl || provider.photoURL;
      }

      user.profilePictureUrl = user.profilePictureUrl || '';

      Logger.info('Finalized user record data', user);
      Logger.info('Updating firebase');
      await ref.set(user);
      Logger.info('Firebase user record added');
    } catch (error) {
      Logger.error('Could not add firebase user record', error.message);
      throw error;
    }
  }

  async deleteFirestoreUserRecord(userId: string) {
    try {
      const db = admin.firestore();
      const ref = db.collection('Users').doc(userId);
      await ref.delete();
      Logger.info('User record deleted');
    } catch (error) {
      Logger.error('Could not delete firestore user record', error.message);
      throw error;
    }
  }

  async removeUser(userId: string) {
    Logger.info('Removing user', userId);
    try {
      const userRef = admin.firestore().doc(`Users/${userId}`);

      const userSnapshot = await userRef.get();
      if (!userSnapshot.exists) {
        throw new Error('Cannot remove user from system. User does not exist!');
      }

      try {
        await admin.auth().deleteUser(userId);
      } catch (error) {
        Logger.error('Could not remove the firebase auth user', error);
        throw new Error('Could not remove user!');
      }
      await userRef.delete();
    } catch (error) {
      Logger.info('Could not remove user', error);
      throw new Error('Could not remove user!');
    }
  }

  async hasFirestoreUserRecord(userId: string) {
    try {
      const db = admin.firestore();
      const ref = db.collection('Users').doc(userId);
      const snapshot = await ref.get();
      return snapshot.exists;
    } catch (error) {
      Logger.error('Could not check if user record exists', error.message);
      throw error;
    }
  }

  async hasFirestoreUserRecordWithEmail(email: string) {
    try {
      const db = admin.firestore();
      const ref = db.collection('Users').where('email', '==', `${email}`);
      const snapshot = await ref.get();
      return snapshot.docs.length > 0;
    } catch (error) {
      Logger.error('Could not check if user record exists', error.message);
      throw error;
    }
  }
}
