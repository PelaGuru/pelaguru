import * as express from 'express';

import { makeResponse } from '../utils/response-creator';

export const versionRouter = express.Router();

versionRouter.post('/', async (req, res) => {
  res.send(makeResponse(true, 'Version: 1.0', 200));
});
