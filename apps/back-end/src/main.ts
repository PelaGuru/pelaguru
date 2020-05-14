import * as functions from 'firebase-functions';
import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';
import { apiRouter } from './app/routes/api-routes';

firebaseAdmin.initializeApp();

const app = express();

app.use('/api', apiRouter);

export const api = functions.https.onRequest(app);