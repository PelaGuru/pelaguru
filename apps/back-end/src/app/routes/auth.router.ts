import * as express from 'express';
import { makeResponse } from '../utils/response-creator';
import { AuthErrorCodes } from '@pelaguru/error-codes';
import { CreateStudentRequest, UserRole } from '@pelaguru/interfaces';
import { AuthService } from '../services/auth.service';
import { logger } from 'firebase-functions';

export const authRouter = express.Router();

const authService = new AuthService();

authRouter.post('/normal-user', async (req, res) => {
  try {
    const { email, password, name }: CreateStudentRequest = req.body;

    if (!email || !password || !name) {
      logger.warn('Invalid required request body data');
      res.send(
        makeResponse(
          false,
          'Invalid required request body data',
          400,
          AuthErrorCodes.InvalidArgument
        )
      );
    } else {
      const isUserExist = await authService.hasFirestoreUserRecordWithEmail(
        email
      );
      if (isUserExist) {
        res.send(
          makeResponse(
            false,
            'User already exist.',
            400,
            AuthErrorCodes.EmailAlreadyExists
          )
        );
      } else {
        const userId = await authService.createFirebaseUser(
          email,
          password,
          name,
          UserRole.NormalUser
        );
        res.send(
          makeResponse(true, 'Normal user added.', 201, null, { userId })
        );
      }
    }
  } catch (error) {
    res.send(
      makeResponse(false, error.message, 500, AuthErrorCodes.InternalError)
    );
  }
});

authRouter.post('/admin', async (req, res) => {
  try {
    const { email, password, name }: CreateStudentRequest = req.body;

    if (!email || !password || !name) {
      logger.warn('Invalid required request body data');
      res.send(
        makeResponse(
          false,
          'Invalid required request body data',
          400,
          AuthErrorCodes.InvalidArgument
        )
      );
    } else {
      const isUserExist = await authService.hasFirestoreUserRecordWithEmail(
        email
      );
      if (isUserExist) {
        res.send(
          makeResponse(
            false,
            'User already exist.',
            400,
            AuthErrorCodes.EmailAlreadyExists
          )
        );
      } else {
        const userId = await authService.createFirebaseUser(
          email,
          password,
          name,
          UserRole.Admin
        );
        res.send(
          makeResponse(true, 'Admin user added.', 201, null, { userId })
        );
      }
    }
  } catch (error) {
    res.send(
      makeResponse(false, error.message, 500, AuthErrorCodes.InternalError)
    );
  }
});

authRouter.post('/moderator', async (req, res) => {
  try {
    const { email, password, name }: CreateStudentRequest = req.body;

    if (!email || !password || !name) {
      logger.warn('Invalid required request body data');
      res.send(
        makeResponse(
          false,
          'Invalid required request body data',
          400,
          AuthErrorCodes.InvalidArgument
        )
      );
    } else {
      const isUserExist = await authService.hasFirestoreUserRecordWithEmail(
        email
      );
      if (isUserExist) {
        res.send(
          makeResponse(
            false,
            'User already exist.',
            400,
            AuthErrorCodes.EmailAlreadyExists
          )
        );
      } else {
        const userId = await authService.createFirebaseUser(
          email,
          password,
          name,
          UserRole.Moderator
        );
        res.send(makeResponse(true, 'Moderator added.', 201, null, { userId }));
      }
    }
  } catch (error) {
    res.send(
      makeResponse(false, error.message, 500, AuthErrorCodes.InternalError)
    );
  }
});

authRouter.post('/resource-person', async (req, res) => {
  try {
    const { email, password, name }: CreateStudentRequest = req.body;

    if (!email || !password || !name) {
      logger.warn('Invalid required request body data');
      res.send(
        makeResponse(
          false,
          'Invalid required request body data',
          400,
          AuthErrorCodes.InvalidArgument
        )
      );
    } else {
      const isUserExist = await authService.hasFirestoreUserRecordWithEmail(
        email
      );
      if (isUserExist) {
        res.send(
          makeResponse(
            false,
            'User already exist.',
            400,
            AuthErrorCodes.EmailAlreadyExists
          )
        );
      } else {
        const userId = await authService.createFirebaseUser(
          email,
          password,
          name,
          UserRole.ResourcePerson
        );
        res.send(
          makeResponse(true, 'Resource person user added.', 201, null, {
            userId,
          })
        );
      }
    }
  } catch (error) {
    res.send(
      makeResponse(false, error.message, 500, AuthErrorCodes.InternalError)
    );
  }
});

authRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const response = await authService.removeUser(userId);
    res.send(makeResponse(true, 'User removed successfully.', 200, response));
  } catch (error) {
    res.send(makeResponse(false, error.message, 500));
  }
});
