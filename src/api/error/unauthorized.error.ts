import { HttpStatus } from '../common/common.interface';

type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];

export class UnauthorizedError extends Error {
  statusCode: HttpStatusCode;

  constructor(message: string) {
    super(message);

    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
