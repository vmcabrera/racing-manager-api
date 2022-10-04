import { Type } from '@sinclair/typebox';
import { HttpStatus } from '../../common/common.interface';

export const AuthRegisterRequest = Type.Object({
  username: Type.String({ minLength: 10, maxLength: 30 }),
  email: Type.String({ format: 'email' }),
  password: Type.RegEx(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=[\w\d#?!@$%^&*-_]).{8,}$/
  ),
  first_name: Type.Optional(Type.String()),
  last_name: Type.Optional(Type.String()),
});

export const AuthRegisterResponse = {
  default: Type.Object({
    statusCode: Type.Enum(HttpStatus),
    error: Type.String(),
    message: Type.String(),
  }),
  '2xx': Type.Object({
    id: Type.String({ format: 'uuid' }),
  }),
};
