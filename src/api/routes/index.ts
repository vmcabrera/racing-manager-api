import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import { authRoutes } from '../auth/auth.routes';
import { HttpStatus } from '../common/common.interface';

export const routes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.register(authRoutes, { prefix: '/auth' });

  server.get('*', async (req: FastifyRequest, res: FastifyReply) => {
    res.code(HttpStatus.NOT_FOUND).send({
      message: 'Route not found',
      error: 'Not Found',
      statusCode: 404,
    });
  });
};
