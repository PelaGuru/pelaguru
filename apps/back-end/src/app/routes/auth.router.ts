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
