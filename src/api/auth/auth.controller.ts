import { Static } from '@sinclair/typebox';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../common/common.interface';
import { AuthService } from './auth.service';
import { AuthRegisterRequest } from './dto/auth-register.dto';

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (
    req: FastifyRequest<{ Body: Static<typeof AuthRegisterRequest> }>,
    res: FastifyReply
  ): Promise<void> => {
    const { username, email, password } = req.body;

    const user = await this.authService.register({ username, email, password });

    res.status(HttpStatus.OK).send({
      id: user.user_uuid,
    });
  };
}
