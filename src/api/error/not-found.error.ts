import { HttpStatus } from '../common/common.interface';

type HttpStatusCode = typeof HttpStatus[keyof typeof HttpStatus];

export class NotFoundError extends Error {
  statusCode: HttpStatusCode;

  constructor(message: string) {
    super(message);

    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
