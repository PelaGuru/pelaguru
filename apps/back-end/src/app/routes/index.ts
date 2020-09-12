import * as express from 'express';
import { json } from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { makeResponse } from '../utils/response-creator';

import { versionRouter } from './version';
import { authRouter } from './auth.router';

export const router = express.Router();

router.use(json());
router.use(cors());
router.use(morgan('tiny'));

router.use('/version', versionRouter);

router.use('/auth', authRouter);

router.get('/', async (_, res) => {
  res.send(makeResponse(true, 'Hello there!'));
});
