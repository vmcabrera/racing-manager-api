import { FastifyInstance } from 'fastify';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import {
  AuthRegisterRequest,
  AuthRegisterResponse,
} from './dto/auth-register.dto';
import { AuthService } from './auth.service';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const authRoutes = async (server: FastifyInstance) => {
  server.post(
    '/register',
    {
      schema: {
        body: AuthRegisterRequest,
        response: AuthRegisterResponse,
      },
    },
    authController.register
  );
};
