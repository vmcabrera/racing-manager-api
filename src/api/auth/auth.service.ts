import bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { InternalError } from '../error/internal.error';
import { User } from '../user/user.interface';
import { AuthRegisterProps } from './auth.interface';

export class AuthService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  register = async (props: AuthRegisterProps): Promise<User> => {
    const { username, email, password } = props;

    const isUserRegistered = await this.userRepository.findOne({ username });
    const isEmailRegistered = await this.userRepository.findOne({ email });

    if (isEmailRegistered || isUserRegistered)
      throw new InternalError('Username or email already registered');

    const hash = await bcrypt.hash(password, 12);
    const user = await this.userRepository.save({
      username,
      email,
      password: hash,
    });

    return user;
  };
}
