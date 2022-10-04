import { HttpStatus } from '../common/common.interface';

type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];

export class InternalError extends Error {
  statusCode: HttpStatusCode;

  constructor(message: string) {
    super(message);

    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
