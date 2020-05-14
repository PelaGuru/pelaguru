import * as express from 'express';
import * as bodyParser from 'body-parser';

import { makeResponse } from '../utils/response-creator';

import { versionRouter } from './version';

export const apiRouter = express.Router();

// tslint:disable-next-line: deprecation
apiRouter.use(bodyParser.json());

apiRouter.use('/version', versionRouter);

apiRouter.get('/', async (req, res) => {
  res.send(makeResponse(true, 'Hello there.'));
});
