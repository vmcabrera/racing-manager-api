import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { HttpStatus } from '../utils/enums';

export const routes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get('*', async (req: FastifyRequest, res: FastifyReply) => {
    res.code(HttpStatus.NOT_FOUND).send({
      message: 'Route not found',
      error: 'Not Found',
      statusCode: 404,
    });
  });
};
