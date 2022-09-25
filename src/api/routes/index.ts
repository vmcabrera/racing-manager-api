import express, { Request, Response, Router } from 'express';
import { HttpStatus } from '../utils/enums';

const router: Router = express.Router();

router.get('*', (req: Request, res: Response) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .send(
      '<html><body><h1>Page not found <span>(404)</span></h1></body></html>'
    );
});

export { router };
