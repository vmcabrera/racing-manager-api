import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { router } from './api/routes';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const server = express();

server.use(express.json());
server.use(`/api/${process.env.API_VERSION}`, router);
server.set('port', PORT);

server.listen(PORT, () => {
  console.info(
    `App is running at http://localhost:${server.get('port')} in ${server.get(
      'env'
    )} mode`
  );
  console.info('Press CTRL-C to stop\n');
});
