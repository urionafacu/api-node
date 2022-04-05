/* eslint-disable import/no-dynamic-require */
import { Router } from 'express';
import fs from 'fs';

const router = Router();

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).forEach(file => {
  if (file !== 'index.ts') {
    // eslint-disable-next-line global-require
    router.use(`/${file}`, require(`./${file}`).default);
  }
});

export default router;
