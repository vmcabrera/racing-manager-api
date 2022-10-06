import dotenv from 'dotenv';
dotenv.config();
import { buildApp } from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const start = () => {
  const server = buildApp({
    logger: !!(process.env.NODE_ENV !== 'development'),
  });

  server.listen({ port: PORT }, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    console.info(
      `App is running at ${address} in ${process.env.NODE_ENV} mode`
    );
    console.info('Press CTRL-C to stop\n');
  });
};

start();
