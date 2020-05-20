import * as functions from 'firebase-functions';
import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import { router } from './app/routes';

firebaseAdmin.initializeApp();

const app = express();

app.use('/', router);

export const api = functions.https.onRequest(app);
