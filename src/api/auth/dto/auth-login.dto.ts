import { Type } from '@sinclair/typebox';
import { HttpStatus } from '../../common/common.interface';

export const AuthLoginRequest = Type.Object({
  username: Type.String({ minLength: 10, maxLength: 30 }),
  password: Type.String(),
});

export const AuthLoginResponse = {
  default: Type.Object({
    statusCode: Type.Enum(HttpStatus),
    error: Type.String(),
    message: Type.String(),
  }),
  '2xx': Type.Object({
    token: Type.String(),
  }),
};

export const AuthLoginSchema = {
  schema: {
    body: AuthLoginRequest,
    response: AuthLoginResponse,
  },
};
