import pgPromise from 'pg-promise';
import { pgConfig } from '../config/database.config';

export const pgp = pgPromise({});
export const pg = pgp(pgConfig);
