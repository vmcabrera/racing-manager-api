import dotenv from 'dotenv';
process.env.PG_DATABASE = 'racing_manager_test';
dotenv.config();

import { pg } from '../src/api/database/database.connection';
import { buildApp } from '../src/app';

const server = buildApp();

export function getBuild() {
  beforeAll(async () => {
    await server.ready();
    await pg.none(`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
  });
  afterAll((done) => {
    server.close();
    pg.$pool.end();

    done();
  });

  return server;
}
