import fastify, { FastifyPluginOptions } from 'fastify';
import { routes } from './api/routes';

export const buildApp = (opts: FastifyPluginOptions = {}) => {
  const app = fastify(opts);

  app.register(routes);

  return app;
};
