import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { InternalError } from '../error/internal.error';

export interface AuthPluginOptions {}

export const jwtAuthPlugin = fp<AuthPluginOptions>(async (server, opts) => {
  if (!process.env.JWT_KEY) throw new InternalError('Something went wrong');

  server.register(jwt, {
    secret: process.env.JWT_KEY,
    sign: {
      expiresIn: 1200,
    },
  });

  server.decorate(
    'jwtAuthenticate',
    async function (req: FastifyRequest, res: FastifyReply, next: Function) {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.send(err);
      }
    }
  );
});

declare module 'fastify' {
  export interface FastifyInstance {
    jwtAuthenticate(): string;
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: { id: string; iat: number; exp: number };
  }
}
