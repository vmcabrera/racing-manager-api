import dotenv from 'dotenv';
dotenv.config();
process.env.PG_DATABASE = process.env.PG_DATABASE_TEST;

import { pg } from '../src/api/database/database.connection';
import { buildApp } from '../src/app';

const server = buildApp();

export function getBuild() {
  beforeAll(async () => {
    await server.ready();
    await pg.query(`START TRANSACTION`);
  });

  afterAll((done) => {
    server.close();
    pg.query('ROLLBACK');
    pg.$pool.end();

    done();
  });

  return server;
}
