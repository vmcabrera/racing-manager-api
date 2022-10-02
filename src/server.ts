import dotenv from 'dotenv';
dotenv.config();

import fastify from 'fastify';
import { routes } from './api/routes';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const server = fastify({
  logger: !!(process.env.NODE_ENV !== 'development'),
});

server.register(routes);

server.listen({ port: PORT }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.info(`App is running at ${address} in ${process.env.NODE_ENV} mode`);
  console.info('Press CTRL-C to stop\n');
});
