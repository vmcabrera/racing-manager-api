import { FastifyInstance } from 'fastify';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthRegisterSchema } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { AuthLoginSchema } from './dto/auth-login.dto';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const authRoutes = async (server: FastifyInstance) => {
  server.post('/register', AuthRegisterSchema, authController.register);
  server.post('/login', AuthLoginSchema, authController.login);
};
